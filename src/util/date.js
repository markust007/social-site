export function date() {
  const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  const d = new Date();
  // const month = monthNames[d.getMonth()];
  const month = d.getMonth() + 1;
  const day = d.getDate();
  const year = d.getFullYear();
  const hours = d.getHours();
  let hour;
  let postfix;
  if (hours > 12) {
    hour = hours - 12
    postfix = "p.m."
  } else {
    hour = hours
    postfix = "a.m."
  }
  // hours > 12 ? hour = hours - 12 : hour = hours
  const min = d.getMinutes();
  const fulldate = month + "/" + day + "/" + year + " at " + hour + ":" + min + postfix;
  return fulldate
}
