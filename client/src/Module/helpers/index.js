const formules = (indice) => {
  switch (indice) {
    case (1) :
      return '20,00'
    default:
      return '12,50'
  }
}
export default formules


export const validator = ( data, func ) => {

  if( data.FirstName && data.LastName && data.email && data.phoneNum  )
    func()
}
