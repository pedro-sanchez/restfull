package br.com.pedro.restfull.controller;

import java.util.ArrayList;
import java.util.List;

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

	@POST
    @Path("/list/{begin}/{end}")
	public List<?> list(@PathParam("begin") Long begin, @PathParam("end") Long end){
		return new ArrayList<>();
	}

	@GET
    @Path("/id/{id}")
	public String findBy(@PathParam("id") Long noteId){
		return noteId.toString();
	}

	@DELETE
    @Path("/{id}")
	public void remove(@PathParam("id") Long noteId){
		System.out.println("remove");
	}

	@POST
    @Path("/")
	public T save(T entity){
		System.out.println("save");
		return entity;
	}
}
