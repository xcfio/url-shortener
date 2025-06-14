import blacklist from "../../osid-block-list.json"
// prettier-ignore
const tld = RegExp(`(${[".cf", ".ga", ".gq", ".ml", ".nl", ".nz", ".tk", ".icu", ".online", ".click"].map((tld) => `\\${tld}`).join("|")})$`, "i")

export async function isBlacklisted(url: string) {
    if (tld.test(url)) return true
    if ((blacklist as Array<string>).includes(url)) return true

    return false
}
