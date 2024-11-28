export class ReservaDB {
  constructor(usuario_id, servicio_id, fecha_hora) {
    this.usuario_id = usuario_id;
    this.servicio_id = servicio_id;
    this.fecha_hora =
      fecha_hora || new Date().toISOString().slice(0, 19).replace('T', ' ');
  }
}
