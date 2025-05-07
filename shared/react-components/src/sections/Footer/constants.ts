import InstagramIcon from "../../icons/Instagram";
import LinkedinIcon from "../../icons/Linkedin";

export const socials = [
  {
    url: "https://www.instagram.com/devopsdayslima/",
    iconName: "Instagram",
  },
  {
    url: "https://www.linkedin.com/company/devops-days-lima/",
    iconName: "Linkedin",
  },
];

export const iconsByName: Record<string, typeof InstagramIcon> = {
  Instagram: InstagramIcon,
  Linkedin: LinkedinIcon,
};
