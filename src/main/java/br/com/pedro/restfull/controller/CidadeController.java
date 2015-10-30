package br.com.pedro.restfull.controller;

import java.util.ArrayList;
import java.util.List;

import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

import br.com.pedro.restfull.entity.Cidade;

@Path("/cidade")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class CidadeController extends GenericController<Cidade>{

	private List<Cidade> data = new ArrayList<>();

	@GET
    @Path("/list/estado/{estadoId}")
	public List<Cidade> listDetail(@PathParam("estadoId") Long estadoId){
		return data;
	}

	@Override
	@POST
    @Path("/")
	public Cidade save(Cidade entity){
		entity.setId(Long.valueOf(data.size()+1));
		data.add(entity);

		System.out.println(data);
		System.out.println(data.size());

		return super.save(entity);
	}

	@Override
	public void remove(Long id) {
		data.remove(id-1);

		super.remove(id);
	}
}
