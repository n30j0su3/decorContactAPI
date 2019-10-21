class clientes
{
	constructor(id, documento_cc, nombre, email, direccion_entrega, ciudad_entrega, celular)
	{
		this.id = id;
		this.documento_cc = documento_cc;
		this.nombre = nombre;
		this.email = email;
		this.direccion_entrega = direccion_entrega;
		this.ciudad_entrega = ciudad_entrega;
		this.celular = celular;
	}
}

module.exports = clientes;