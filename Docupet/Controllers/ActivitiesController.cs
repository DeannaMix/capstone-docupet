using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Dapper;
using Docupet.Models;
using Docupet.DataAccess;
using Docupet.Repositories;

namespace Docupet.Controllers
{
    [Route("api/activities")]
    [ApiController]
    public class ActivitiesController : ControllerBase
    {
        Repositories.ActivitiesRepository _repo;

        public ActivitiesController()
        {
            _repo = new ActivitiesRepository();
        }
        [HttpGet]
        //api/activities

        public IActionResult GetAllActivities()
        {
            return Ok(_repo.GetAll());
        }

        [HttpPost]
        // api/activities

        public IActionResult AddActivity(Activity activity)
        {
            _repo.add(activity);
            return Created($"api/activities/{activity.id})", activity);

        }

        //GET to /api/activity/{id}
        [HttpGet("{id}")]
        public IActionResult GetById(int id)
        {
            var activity = _repo.Get(id);

            if (activity == null)
            {
                return NotFound("Activity not found");
            }

            return Ok(activity);
        }

        [HttpPut("{id}/update")]
        // api/activity/{id}/update
        public IActionResult UpdateEvent(Activity activity)
        {
            if (activity == null)
            {
                return NotFound("The activity you are trying to update could not be found. Sorry...");
            };
            _repo.Update(activity);

            return Ok(activity);
        }

        //Delete an Activity
        [HttpDelete("{activityId}")]
        public IActionResult DeleteAni(int activityId)
        {
            _repo.Remove(activityId);

            return Ok();
        }


    }
}
