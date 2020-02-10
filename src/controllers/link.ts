
enum Relation {
  Self = 'self',
  Next = 'next',
  Previous = 'previous',
  New = 'new',
  Delete = 'delete'
}

enum Method {
  Get = 'GET',
  Post = 'POST',
  Delete = 'DELETE'
}

export default class Link {
  constructor (readonly rel: Relation | string, readonly method: Method, readonly href: string) {}

  toString () {
    return `[${this.rel}] ${this.method} ${this.href}`
  }
}

const builder = (rel: Relation | string) => (method: Method) => (href: string) => new Link(rel, method, href)
const selfLink = (href: string) => new Link(Relation.Self, Method.Get, href)
const newLink = (href: string) => new Link(Relation.New, Method.Post, href)
const deleteLink = (href: string) => new Link(Relation.Delete, Method.Delete, href)

export {
  builder,
  selfLink,
  newLink,
  deleteLink,
  Method,
  Relation
}
