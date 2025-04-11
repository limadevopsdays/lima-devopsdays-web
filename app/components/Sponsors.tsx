'use client';
import React from 'react';
import Image from 'next/image';

// Logo sponsors object for the visual cards
const sponsorLogos = {
  platinum: [
    { name: 'AWS', logo: 'https://upload.wikimedia.org/wikipedia/commons/9/93/Amazon_Web_Services_Logo.svg' },
    { name: 'Google Cloud', logo: 'https://upload.wikimedia.org/wikipedia/commons/0/01/Google_Cloud_Logo.svg' },
    { name: 'Microsoft Azure', logo: 'https://upload.wikimedia.org/wikipedia/commons/a/a8/Microsoft_Azure_Logo.svg' },
  ],
  gold: [
    { name: 'IBM', logo: 'https://upload.wikimedia.org/wikipedia/commons/5/51/IBM_logo.svg' },
    { name: 'Red Hat', logo: 'https://upload.wikimedia.org/wikipedia/commons/d/d8/Red_Hat_logo.svg' },
    { name: 'Oracle', logo: 'https://upload.wikimedia.org/wikipedia/commons/5/50/Oracle_logo.svg' },
    { name: 'VMware', logo: 'https://upload.wikimedia.org/wikipedia/commons/9/9a/Vmware.svg' },
  ],
  silver: [
    { name: 'GitLab', logo: 'https://upload.wikimedia.org/wikipedia/commons/e/e1/GitLab_logo.svg' },
    {
      name: 'Docker',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/4/4e/Docker_%28container_engine%29_logo.svg',
    },
    { name: 'HashiCorp', logo: 'https://upload.wikimedia.org/wikipedia/commons/6/6b/Hashicorp_Logo.svg' },
    { name: 'Elastic', logo: 'https://upload.wikimedia.org/wikipedia/commons/f/f4/Elastic_logo.svg' },
    { name: 'DataDog', logo: 'https://upload.wikimedia.org/wikipedia/en/2/25/Datadog_logo.svg' },
  ],
};
