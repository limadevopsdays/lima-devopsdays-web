import json
import os
import sys

def analyze():
    filepath = 'Trace-20260531T223547.json'
    if not os.path.exists(filepath):
        print(f"Error: {filepath} not found.")
        sys.exit(1)

    print("Loading 60MB trace file, please wait...")
    with open(filepath, 'r') as f:
        try:
            data = json.load(f)
        except Exception as e:
            print(f"Error parsing JSON: {e}")
            sys.exit(1)

    # Chrome traces can be a list or a dict with "traceEvents"
    events = []
    if isinstance(data, list):
        events = data
    elif isinstance(data, dict) and 'traceEvents' in data:
        events = data['traceEvents']
    else:
        print("Unknown JSON trace format.")
        sys.exit(1)

    print(f"Successfully loaded {len(events)} trace events.")

    # We want to track:
    # 1. Total CPU time per event name
    # 2. Long tasks (>50ms)
    # 3. Resource requests and their sizes/durations if available
    cpu_totals = {}
    long_tasks = []
    network_requests = {}

    for event in events:
        name = event.get('name')
        ph = event.get('ph') # phase (B: begin, E: end, X: complete)
        dur = event.get('dur') # duration in microseconds
        ts = event.get('ts') # timestamp in microseconds

        # 1. Aggregate Complete (X) event durations
        if ph == 'X' and dur is not None:
            dur_ms = dur / 1000.0
            cpu_totals[name] = cpu_totals.get(name, 0.0) + dur_ms

            if dur_ms > 50.0:
                long_tasks.append({
                    'name': name,
                    'dur_ms': dur_ms,
                    'ts': ts,
                    'args': event.get('args', {})
                })

        # 2. Monitor Network Resource Requests
        if name == 'ResourceSendRequest':
            args = event.get('args', {})
            data_req = args.get('data', {})
            req_id = data_req.get('requestId')
            url = data_req.get('url')
            if req_id and url:
                network_requests[req_id] = {
                    'url': url,
                    'send_ts': ts,
                    'dur_ms': 0.0,
                    'size_bytes': 0
                }
        elif name == 'ResourceReceiveResponse':
            args = event.get('args', {})
            data_res = args.get('data', {})
            req_id = data_res.get('requestId')
            size = data_res.get('encodedDataLength', 0)
            if req_id in network_requests:
                network_requests[req_id]['size_bytes'] = size
        elif name == 'ResourceFinish':
            args = event.get('args', {})
            data_fin = args.get('data', {})
            req_id = data_fin.get('requestId')
            if req_id in network_requests and 'send_ts' in network_requests[req_id]:
                network_requests[req_id]['dur_ms'] = (ts - network_requests[req_id]['send_ts']) / 1000.0

    print("\n=== TOP CPU ACTIVITIES (Total Duration) ===")
    sorted_cpu = sorted(cpu_totals.items(), key=lambda x: x[1], reverse=True)
    for name, duration in sorted_cpu[:12]:
        print(f" - {name:<30}: {duration:>8.2f} ms")

    print("\n=== LONG CPU TASKS (> 50ms) ===")
    sorted_long = sorted(long_tasks, key=lambda x: x['dur_ms'], reverse=True)
    print(f"Found {len(sorted_long)} long tasks blocking the main thread.")
    for task in sorted_long[:10]:
        args_str = json.dumps(task['args'])[:120]
        print(f" - {task['name']:<25} | {task['dur_ms']:>8.2f} ms | args: {args_str}...")

    print("\n=== SLOWEST NETWORK REQUESTS ===")
    sorted_network = sorted(network_requests.values(), key=lambda x: x['dur_ms'], reverse=True)
    count = 0
    for req in sorted_network:
        url = req['url']
        # Filter out chrome-extension or external analytics if we want to focus on our app, or keep them all
        if count >= 12:
            break
        size_kb = req.get('size_bytes', 0) / 1024.0
        print(f" - {req['dur_ms']:>8.2f} ms | {size_kb:>7.2f} KB | {url[:100]}")
        count += 1

if __name__ == '__main__':
    analyze()
