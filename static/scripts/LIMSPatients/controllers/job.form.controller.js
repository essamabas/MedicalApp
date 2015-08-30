

/**
* @namespace JobFormController
*/
function JobFormController(JobService, EventService,
        ProjectService, DTOptionsBuilder, DTColumnDefBuilder) {

    var vm = this;

    vm.open = function($event) {
        $event.preventDefault();
        $event.stopPropagation();

        vm.opened = true;
    };

}
