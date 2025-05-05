import { Fragment } from "react/jsx-runtime";
import Button from "../../button";
import Subtitle from "../../subtitle";

import "./style.css";

export interface NavItem {
  text: string;
  href: string;
  variant: "text" | "primary" | "secondary" | "tertiary";
}

export interface HeaderProps {
  logoText: string;
  navItems: NavItem[];
}

// TODO: the input that controls everythiong shudl be above all to make descednts behave more properly
//and target multiple divs instead of one sibling
export default function Header({
  logoText,
  navItems
}: Readonly<HeaderProps>) {
  return (
    <>
      <header className="devops-days-navbar bg-gray-4 sticky top-0 w-full h-16 sm:h-auto z-20">
        <div className="flex items-center justify-between py-4 px-6 max-w-[1200px] mx-auto h-full">
          <Subtitle href="/" as="a" weight="light" size="sm">{logoText}</Subtitle>
          <label
            htmlFor="menu-toggle"
            className="sm:hidden flex flex-col justify-center items-center w-8 h-8 cursor-pointer"
            aria-label="Open menu"
            tabIndex={0}
          >
            <div className="w-6 h-0.5 bg-white mb-1.5 rounded"></div>
            <div className="w-6 h-0.5 bg-white mb-1.5 rounded"></div>
            <div className="w-6 h-0.5 bg-white rounded"></div>
          </label>

          <nav className="hidden sm:flex gap-4">
            {navItems.map(({ href, text, variant }, index) => (
              <Button key={index} as="a" href={href} variant={variant} size="medium">
                {text}
              </Button>
            ))}
          </nav>
        </div>
      </header>
      <input
        id="menu-toggle"
        type="checkbox"
        className="hidden peer"
        hidden
      />
      <nav
        aria-hidden="true"
        className="mobile-navbar top-16 fixed left-0 w-full z-10 text-white bg-gray-4 text-center py-4 transition-transform duration-300 -translate-y-full peer-checked:translate-y-0 flex flex-col gap-0 sm:hidden"
      >
        {navItems.map(({ href, text, variant }, index) => (
          <Fragment key={href+index}>
            <Button

              as="a"
              href={href}
              variant={variant}
              size="large"
              className="text-center w-full py-5"
            >
              {text}
            </Button>
            {index < navItems.length - 1 && (
              <div className="mobile-navbar-separator h-px bg-white opacity-30" />
            )}
          </Fragment>
        ))}
      </nav>
    </>
  )
}
