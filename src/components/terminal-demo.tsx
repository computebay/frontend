"use client";
import { Terminal } from "./ui/terminal";

export default function TerminalDemo() {
  return (
    <section className="w-full">
      <Terminal
        commands={[
          
          "computebay run --url github.com/computebay/demo --cpu 2 --memory 2048",
          "computebay logs --f",
        ]}
        outputs={{
          
          0: [
            "Cloning repository...",
            "✔ Downloading packages...",
            "✔ Installing dependencies...",
            "✔ Building Docker image...",
            "✔ Secured 2 vCPU and 2048MB RAM (Community Nodes).",
            "✔ Booting sandboxed containers...",
            "✔ Job started successfully. ID: job_9bb2",
          ],
          1: [
            "Streaming logs for job_9bb2...",
            "> Build complete.",
            "> Starting service...",
            "Service is running! Access at: https://job-9bb2.computebay.online",
          ],
        }}
        typingSpeed={50}
        delayBetweenCommands={1000}
      />
    </section>
  );
}
