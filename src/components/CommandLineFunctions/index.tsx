import { socialMediaLinks } from "utils/constants";
import { formatTitle } from "utils/format";
import { zustandStore } from "utils/store";
import "./commandLineFunctions.scss";

const Projects = () => {
  const { projects } = zustandStore();

  if (projects.length === 0) return <div>Loading...</div>;

  return (
    <div className="Project_section">
      {projects.map((project) => (
        <div key={project._id} className="Function_container">
          <ul>
            <li className="faj-b-project">
              <a href={project.demo} target="_blank" rel="noreferrer">
                {project.name}
              </a>

              <span
                onClick={() => {
                  const clipboard = `cd ${formatTitle(project.name)} -p`;
                  navigator.clipboard.writeText(clipboard);
                }}
              >
                cd {formatTitle(project.name)} -p
              </span>
            </li>

            <li className="mt-5">{project.about.split(".")[0]}</li>
          </ul>
        </div>
      ))}
    </div>
  );
};

export const CommandLineFunctions = [
  {
    functions: "",
    shortcut: "",
    description: <></>,
  },
  {
    functions: "help",
    shortcut: "-h",
    description: (
      <div className="Function_container">
        <p>List all available commands</p>

        <ul className="ml-20">
          <li>{"sara: Display's information about myself"}</li>

          <ul className="ml-20">
            <li className="faj-b">
              <span>--help</span>
              <span>-h</span>
            </li>

            <li className="faj-b">
              <span>--whoami</span>
              <span>-w</span>
            </li>

            <li className="faj-b">
              <span>--projects</span>
              <span>-p</span>
            </li>

            <li className="faj-b">
              <span>--socials</span>
              <span>-s</span>
            </li>
          </ul>
        </ul>
      </div>
    ),
  },
  {
    functions: "sara --help",
    shortcut: "sara -h",
    description: (
      <div className="Function_container">
        <p>List all available commands</p>
        <ul>
          <ul className="ml-20">
            <li>
              <p className="faj-b">
                <span>--whoami</span>
                <span>-w</span>
              </p>

              <p className="mt-5 mb-10">This command describes about me</p>
            </li>

            <li>
              <p className="faj-b">
                <span>--projects</span>
                <span>-p</span>
              </p>

              <p className="mt-5 mb-10">
                This command shows all the project that I have done so far
              </p>
            </li>

            <li>
              <p className="faj-b">
                <span>--socials</span>
                <span>-s</span>
              </p>

              <p className="mt-5 mb-10">
                This command shows all of my social media handles
              </p>
            </li>
          </ul>
        </ul>
      </div>
    ),
  },
  {
    functions: "sara --whoami",
    shortcut: "sara -w",
    description: (
      <div className="Function_container">
        <p>
          {`Hii there 👋, I am Sarath Adhithya, Undergraduate student at VIT - Chennai pursuing CSE AI and Robotics. 

I am a Full Stack developer and Blockchain en.
          
I live in Chennai and I am passionate about learning new things. I am currently learning everything related to Web Development and Blockchain.
`}
        </p>
      </div>
    ),
  },
  {
    functions: "sara --projects",
    shortcut: "sara -p",
    description: <Projects />,
  },
  {
    functions: "sara --socials",
    shortcut: "sara -s",
    description: (
      <div className="Socials_section">
        {socialMediaLinks.map(({ name, href }) => (
          <ul key={formatTitle(name)}>
            <li className="faj-b-socials">
              <a href={href} target="_blank" rel="noreferrer">
                {name}
              </a>

              <span
                onClick={() => {
                  const clipboard = `cd ${formatTitle(name)} -s`;
                  navigator.clipboard.writeText(clipboard);
                }}
              >
                cd {formatTitle(name)} -s
              </span>
            </li>

            <li className="mt-5">{name}</li>
          </ul>
        ))}
      </div>
    ),
  },
];
