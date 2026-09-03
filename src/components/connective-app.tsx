import { Link } from "@tanstack/react-router";
import { Lock } from "lucide-react";
import { connectiveApp } from "@/data/site";
import { SectionHeading } from "@/components/section-heading";

export function ConnectiveAppModule() {
  return (
    <section id="connective" className="border-t border-border py-16 md:py-24">
      <div className="page-wrap">
        <SectionHeading
          index="03"
          label="Independent product"
          title="Connective software for gyms and members."
        />
        <Link
          to="/work/$slug"
          params={{ slug: "connective-fitness" }}
          className="app-module group mt-8 block no-underline"
        >
          <div className="app-module-lead">
            <span className="app-lock-wrap" aria-hidden="true">
              <span className="app-lock">
                <img src={connectiveApp.icon} alt="Connective Fitness APP" width={88} height={88} />
                <i className="app-lock-badge">
                  <Lock className="size-3.5" />
                </i>
              </span>
              <span className="builder-hammer">
                <span>🔨</span>
              </span>
            </span>
            <div className="app-module-copy">
              <span className="app-status-wrap">
                <span className="builder-stage builder-stage-status" aria-hidden="true">
                  <span className="builder-hog">{"\u{1F477}\u{1F3FC}"}</span>
                </span>
                <span className="app-status">{connectiveApp.status}</span>
              </span>
              <h3 className="display mt-3 text-2xl text-fg md:text-4xl">
                {connectiveApp.name}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted md:text-base text-pretty">
                {connectiveApp.summary}
              </p>
            </div>
          </div>
          <ul className="app-module-users">
            {connectiveApp.users.map((item, i) => (
              <li key={item.title} className={i === 0 ? "app-user-gym" : undefined}>
                {i === 0 ? (
                  <span className="builder-stage builder-stage-gym" aria-hidden="true">
                    <span className="builder-hog">{"\u{1F477}\u{1F3FC}"}</span>
                  </span>
                ) : null}
                <p className="text-sm font-medium text-fg">{item.title}</p>
                <p className="mt-1 text-sm text-muted">{item.body}</p>
              </li>
            ))}
          </ul>
          <p className="mt-5 text-sm font-medium text-fg">
            Locked while in development
          </p>
        </Link>
      </div>
    </section>
  );
}
