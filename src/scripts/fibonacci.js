export default function* fib() {
  let prev = 0, cur = 1;
  for(;;) {
    yield cur;
    let temp = cur;
    cur = cur + prev;
    prev = temp;
  }
}
