import Button from "../../button";
import Subtitle from "../../subtitle";

export interface NavItem {
  text: string;
  href: string;
  variant: "text" | "primary" | "secondary" | "tertiary";
}

export interface HeaderProps {
  logoText: string;
  navItems: NavItem[];
}

export default function Header({
  logoText,
  navItems
}: HeaderProps) {

  return (
    <header className="bg-gray-4">
      <div className="flex items-center justify-between py-4 px-6 max-w-[1200px] mx-auto">
        <Subtitle href="/" as="a" weight="light" size="sm">{logoText}</Subtitle>

        <nav className="hidden sm:flex gap-4">
          {navItems.map(({ href, text, variant }, index) => (
            <Button key={index} as="a" href={href} variant={variant} size="medium">
              {text}
            </Button>
          ))}
        </nav>
      </div>
    </header>
  )
}