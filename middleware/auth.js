export default function ({ route, redirect }) {
  const codRef = localStorage.getItem('cod_ref')

  if (!codRef) {
    return redirect('/pages/login') // Redirige a la página de inicio de sesión si no existe cod_ref
  } else {
    return Promise.resolve() // Continúa con la navegación si existe cod_ref
  }
}
