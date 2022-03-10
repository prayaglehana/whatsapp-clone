export const makeQueryString = (q) => {
  return Object.keys(q)
    .reduce((a, k) => {
      if (Array.isArray(q[k])) {
        q[k].forEach((v) => {
          a.push(k + "=" + encodeURIComponent(v));
        });
      } else if (q[k] !== undefined) {
        a.push(k + "=" + encodeURIComponent(q[k]));
      }
      return a;
    }, [])
    .join("&");
};
