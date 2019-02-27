'use strict';

module.exports = function(Todo) {
  Todo.beforeRemote('create', function(context, user, next) {
    context.args.data.usuarioId = context.req.accessToken.userId;
    if(context.args.data.date < Date.now()){
      context.args.data.date="error, no puede haber un evento pasado"
    }
    next();
  });

  /**
   * nos devuelve los eventos pendientes del usuario autenticado
   * @param {Function(Error, array)} callback
   */

  Todo.prototype.eventosPendientes = function(ctx, callback) {
    var resultado;
    // TODO
    var idUsuario = ctx.req.accessToken.userId;
    if (idUsuario!==null) {
      if(ctx.args.data.date > Date.now() && ctx.args.data.usuarioId == idUsuario) {
        resultado.find({
          include: {
            relation: 'todos',
            scope: {
              fields: ['title','descripcion','date','isComplete','id','usuarioId']
            }
          }
        }, function(err, hayEvento){
          callback(err, hayEvento);
        });
      }
    }
    callback(null, resultado);
  };

};
