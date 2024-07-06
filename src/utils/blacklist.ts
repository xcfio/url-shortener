let blacklist: Set<string> = new Set()
// prettier-ignore
const tld = RegExp(`(${[".cf", ".ga", ".gq", ".ml", ".nl", ".nz", ".tk", ".icu", ".online", ".click"].map((tld) => `\\${tld}`).join("|")})$`, "i")
const website = ["url-xcf.netlify.app", "opensea.io", "pornhub.com", "sellix.io", "t.me", "telegram.com", "telegram.me"]

fetch("https://raw.githubusercontent.com/nikolaischunk/discord-phishing-links/main/domain-list.json")
    .then((buffer) => buffer.json())
    .then((data) => (blacklist = new Set<string>(data.domains as Array<string>)))
    .catch(console.trace)

export function isBlacklisted(url: string) {
    if (tld.test(url)) return true
    if (website.includes(url)) return true
    if (blacklist.has(url)) return true
    return false
}
