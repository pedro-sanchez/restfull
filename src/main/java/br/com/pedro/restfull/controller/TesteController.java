package br.com.pedro.restfull.controller;

import javax.ws.rs.Consumes;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

import br.com.pedro.restfull.entity.Pessoa;

@Path("/teste")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class TesteController extends GenericController<Pessoa>{

	@Override
	public String ping() {
		return "pong 2";
	}
}
