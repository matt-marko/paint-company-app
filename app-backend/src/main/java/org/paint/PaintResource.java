package org.paint;

import jakarta.transaction.Transactional;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;

import java.net.URI;
import java.util.List;

@Path("/paint")
public class PaintResource {

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public Response getPaints() {
        List<PaintEntity> highScores = PaintEntity.listAll();
        return Response.ok(highScores).build();
    }

    @POST
    @Transactional
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
    public Response createPaints(List<PaintEntity> paints) {
        for (PaintEntity paint : paints) {
            PaintEntity.persist(paint);
        }

        if(paints.stream().allMatch(PaintEntity::isPersistent)) {
            return Response.status(Response.Status.CREATED).build();
        }

        return Response.status(Response.Status.BAD_REQUEST).build();
    }

    @PUT
    @Transactional
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
    public Response updatePaints(List<PaintEntity> updatedPaints) {
        List<PaintEntity> existingPaints = PaintEntity.listAll();

        String existingPaintColour = "";
        String updatedPaintColour = "";

        for (PaintEntity existingPaint : existingPaints) {
            for (PaintEntity updatedPaint : updatedPaints) {
                existingPaintColour = existingPaint.colour.toLowerCase();
                updatedPaintColour = updatedPaint.colour.toLowerCase();

                if (existingPaintColour.equals(updatedPaintColour)) {
                    existingPaint.status = updatedPaint.status;
                    existingPaint.persist();
                    break;
                }
            }
        }

        return Response.ok(existingPaints).build();
    }
}