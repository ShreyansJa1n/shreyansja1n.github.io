import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command";
import {
  Briefcase,
  BookOpen,
  Code,
  Copy,
  ExternalLink,
  FileText,
  Github,
  GraduationCap,
  Hash,
  Layers,
  Linkedin,
  Mail,
  Mailbox,
  Moon,
  Sparkles,
  Sun,
  Wrench,
} from "lucide-react";
import DarkModeContext from "@/contexts/dark";

const SECTIONS: { id: string; label: string; Icon: typeof Hash }[] = [
  { id: "top", label: "Hero", Icon: Sparkles },
  { id: "for-recruiters", label: "For recruiters", Icon: Briefcase },
  { id: "about", label: "About", Icon: Hash },
  { id: "education", label: "Education", Icon: GraduationCap },
  { id: "experience", label: "Experience", Icon: Briefcase },
  { id: "projects", label: "Projects", Icon: Code },
  { id: "skills", label: "Skills", Icon: Wrench },
  { id: "writing", label: "Writing", Icon: BookOpen },
  { id: "certifications", label: "Certifications", Icon: Layers },
  { id: "contact", label: "Contact", Icon: Mailbox },
];

export const CommandPalette = () => {
  const [open, setOpen] = useState(false);
  const [darkMode, setDarkMode] = useContext(DarkModeContext);
  const navigate = useNavigate();

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const isInput = /INPUT|TEXTAREA|SELECT/.test(
        (e.target as HTMLElement | null)?.tagName || ""
      );
      const modK = (e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k";
      if (modK) {
        e.preventDefault();
        setOpen((o) => !o);
        return;
      }
      if (e.key === "/" && !isInput && !e.metaKey && !e.ctrlKey && !e.altKey) {
        e.preventDefault();
        setOpen(true);
      }
    };
    const onOpen = () => setOpen(true);
    window.addEventListener("keydown", onKey);
    window.addEventListener("palette:open", onOpen);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("palette:open", onOpen);
    };
  }, []);

  const jumpTo = (id: string) => {
    setOpen(false);
    const scroll = () =>
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
    if (window.location.pathname !== "/") {
      navigate("/");
      setTimeout(scroll, 60);
    } else {
      scroll();
    }
  };

  const openExternal = (url: string) => {
    window.open(url, "_blank", "noopener,noreferrer");
    setOpen(false);
  };

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText("shreyansjain.work@gmail.com");
    } catch {
      /* ignore clipboard failures */
    }
    setOpen(false);
  };

  return (
    <CommandDialog open={open} onOpenChange={setOpen}>
      <CommandInput placeholder="Jump to a section, link, or action..." />
      <CommandList>
        <CommandEmpty>No matches.</CommandEmpty>
        <CommandGroup heading="Jump to">
          {SECTIONS.map((s) => (
            <CommandItem key={s.id} value={s.label} onSelect={() => jumpTo(s.id)}>
              <s.Icon className="mr-2" />
              {s.label}
            </CommandItem>
          ))}
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="Links">
          <CommandItem
            value="github profile"
            onSelect={() => openExternal("https://github.com/ShreyansJa1n")}
          >
            <Github className="mr-2" />
            GitHub
            <ExternalLink className="ml-auto h-3.5 w-3.5 opacity-60" />
          </CommandItem>
          <CommandItem
            value="linkedin profile"
            onSelect={() => openExternal("https://linkedin.com/in/shrejae")}
          >
            <Linkedin className="mr-2" />
            LinkedIn
            <ExternalLink className="ml-auto h-3.5 w-3.5 opacity-60" />
          </CommandItem>
          <CommandItem
            value="email shreyans"
            onSelect={() => {
              window.location.href =
                "mailto:shreyansjain.work@gmail.com?subject=iOS%20%2F%20Software%20Engineer%20Role";
              setOpen(false);
            }}
          >
            <Mail className="mr-2" />
            Email Shreyans
          </CommandItem>
          <CommandItem
            value="resume pdf download"
            onSelect={() => openExternal("/ShreyansResume.pdf")}
          >
            <FileText className="mr-2" />
            Download resume
          </CommandItem>
          <CommandItem
            value="nlq natural language queries github"
            onSelect={() => openExternal("https://github.com/ShreyansJa1n/nl-db")}
          >
            <Code className="mr-2" />
            NLQ on GitHub
            <ExternalLink className="ml-auto h-3.5 w-3.5 opacity-60" />
          </CommandItem>
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="Actions">
          <CommandItem
            value={darkMode ? "switch to light mode theme" : "switch to dark mode theme"}
            onSelect={() => setDarkMode((d) => !d)}
          >
            {darkMode ? <Sun className="mr-2" /> : <Moon className="mr-2" />}
            {darkMode ? "Switch to light mode" : "Switch to dark mode"}
            <CommandShortcut>theme</CommandShortcut>
          </CommandItem>
          <CommandItem value="copy email address clipboard" onSelect={copyEmail}>
            <Copy className="mr-2" />
            Copy email address
          </CommandItem>
          <CommandItem
            value="writing blog posts"
            onSelect={() => {
              setOpen(false);
              navigate("/blogs");
            }}
          >
            <BookOpen className="mr-2" />
            Go to writing
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
};
