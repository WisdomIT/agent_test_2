console.log("chzzk-bot worker started");

// 봇 기능이 구현될 때까지 프로세스를 유지합니다.
process.on("SIGTERM", () => {
  console.log("chzzk-bot worker stopped");
  process.exit(0);
});

setInterval(() => {}, 1 << 30);
