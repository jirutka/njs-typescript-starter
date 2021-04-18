import qs from 'querystring'


export function hello (r: NginxHTTPRequest): void {
  const name = r.args.name ? qs.unescape(r.args.name) : 'world'

  return r.return(200, `
    Meow, ${name}!

        ("\`-''-/").___..--''"\`-._
        \`6_ 6  )   \`-.  (     ).\`-.__.\`)
        (_Y_.)'  ._   )  \`._ \`. \`\`-..-'
      _..\`--'_..-_/  /--'_.' ,'
      (il),-''  (li),'  ((!.-'
  `)
}
