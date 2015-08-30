define(function(require) {

      /**
      * @namespace JobListController
      */
    function JobListController(JobService, EventService,
            ProjectService, DTOptionsBuilder, DTColumnDefBuilder) {

        var vm = this;

        // Define Columns Layout
        vm.ColumnsData = ['ID', 'State', 'Description', 'Project' , 'Resources', 'Event', 'Actions'];

        // Define Columns Properties
        vm.dtColumnDefs = [];
        for(i=0; i< vm.ColumnsData.length; i++) {
            vm.dtColumnDefs.push(DTColumnDefBuilder.newColumnDef(i));
            // Make last Column notsortable
            if(i== vm.ColumnsData.length -1) {
                vm.dtColumnDefs.push(DTColumnDefBuilder.newColumnDef(i).notSortable());
            }
        }

        vm.RemoveItem = function(index) {
            var jobId = vm.jobs[index].id;
            JobService.delete({pk:jobId},function() {
                vm.jobs.splice(index, 1);
            });
        };

        // Get Jobs-List
        vm.ReloadJobs = function () {
            JobService.query().$promise.then(function(jobs) {
                for (i = 0; i < jobs.length; i++) {
                    // Copy to id
                    jobs[i].id = jobs[i].pk;

                    // Get Jobs-Events details - if assigned
                    if(jobs[i].Event!== null) {
                        jobs[i].Event = EventService.get({pk:jobs[i].Event});
                        //setTimeout(function() {alert(JSON.stringify(jobs));}, 5000);
                    };

                    // Get Jobs-Projects details - if assigned
                    if(jobs[i].project!== null) {
                        jobs[i].project = ProjectService.get({pk:jobs[i].project});
                        //setTimeout(function() {alert(JSON.stringify(jobs));}, 5000);
                    };
                }
                vm.jobs=jobs;
            });
         };

        vm.ReloadJobs();
        vm.dtOptions = DTOptionsBuilder.newOptions().withPaginationType('full_numbers');

    }
    /* EOF */
    return JobListController;
});