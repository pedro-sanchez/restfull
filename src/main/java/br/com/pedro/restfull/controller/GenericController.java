package br.com.pedro.restfull.controller;

import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

import br.com.pedro.restfull.generic.IEntidade;

public abstract class GenericController <T extends IEntidade<?>> {

	@GET
	@Path("/ping")
	@Produces(MediaType.TEXT_HTML)
	public String ping(){
		return "pong";
	}

	@GET
    @Path("/id/{id}")
	public String findBy(@PathParam("id") Long noteId){
		return noteId.toString();
	}

	@DELETE
    @Path("/id/{id}")
	public String remove(@PathParam("id") Long noteId){
		return "removed";
	}

	@POST
    @Path("/")
	public String post(T entity){
		return "postado" + entity.getId();
	}
}
