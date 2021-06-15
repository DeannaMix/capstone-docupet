using Dapper;
using Microsoft.Data.SqlClient;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Docupet.Models;
using System.Diagnostics;

namespace Docupet.Repositories
{
    public class ActivitiesRepository
    {
        const string ConnectionString = "Server=localhost;Database=DocuPet;Trusted_Connection=True;";

        public List<Activity> GetAll()
        {
            using var db = new SqlConnection(ConnectionString);

            var sql = @"Select *
                        From Activities";

            return db.Query<Activity>(sql).ToList();
        }

        //add activity

        public void Add(Activity activity)
        {
            var sql = @"INSERT INTO [Activities] ([Name],[Time])
                        OUTPUT inserted.Id
                        VALUES(@Name, @Time)";

            using var db = new SqlConnection(ConnectionString);

            var id = db.ExecuteScalar<int>(sql, activity);

            activity.Id = id;
        }


        //Get a single activity
        public Activity Get(int id)
        {
            var sql = @"Select *
                        From Activity
                        where Id = @id";

            using var db = new SqlConnection(ConnectionString);

            var activity = db.QueryFirstOrDefault<Activity>(sql, new { id = id });

            return activity;
        }

        public void Update(Activity activity)
        {
            var sql = @"UPDATE Activity
                        SET
                        Name = @name,
                        Time = @time,
                        

            using var db = new SqlConnection(ConnectionString);
            db.Execute(sql, activity);
        }

     //Delete Activity
        public void Remove(int id)
        {
            var sql = @"Delete
                        from Activity
                        where Id = @id";

            using var db = new SqlConnection(ConnectionString);

            db.Execute(sql, new { id });
        }
    }
}
