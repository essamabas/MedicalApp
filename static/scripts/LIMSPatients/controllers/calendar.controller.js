
define(function(require) {

      /**
      * @namespace CalendarController
      */
    function CalendarController($scope,$compile,$cookies, uiCalendarConfig, $modal,
		CalendarPartials, CalendarService, CalendarEventService) {
		
        var date = new Date();
        var d = date.getDate();
        var m = date.getMonth();
        var y = date.getFullYear();


        /* alert on eventClick */
        this.alertOnEventClick = function( date, jsEvent, view){
            $scope.alertMessage = (date.title + ' was clicked ');
            // Open ui.bootstrap.modal
            var modalInstance = $modal.open({
              templateUrl: CalendarPartials + 'addeventmodal.html',
              windowClass: 'devoops-modal',
              controller: function ($scope, $modalInstance) {
                $scope.data = date;
                $scope.add = function () {
                    $modalInstance.close($scope.data);
                };
                $scope.cancel = function () {
                    $modalInstance.dismiss('cancel');
                };
              }
            });

            modalInstance.result.then(function (data) {
              alert( "Modal succeeded - closed: Event-Name: " + data.title );
              console.log("data: " + data);
            }, function () {
              alert("Modal dismissed at: " + new Date());
            });

        };
        /* alert on Drop */
         this.alertOnDrop = function(event, delta, revertFunc, jsEvent, ui, view){
           $scope.alertMessage = ('Event Droped to make dayDelta ' + delta);
        };

        /* alert on Resize */
        this.alertOnResize = function(event, delta, revertFunc, jsEvent, ui, view ){
           $scope.alertMessage = ('Event Resized to make dayDelta ' + delta);
        };

        /* add and removes an event source of choice */
        $scope.addRemoveEventSource = function(sources,source) {
          var canAdd = 0;
          angular.forEach(sources,function(value, key){
            if(sources[key] === source){
              sources.splice(key,1);
              canAdd = 1;
            }
          });
          if(canAdd === 0){
            sources.push(source);
          }
        };
        /* add custom event*/
        $scope.addEvent = function() {
          $scope.events.push({
            title: 'Open Sesame',
            start: new Date(y, m, 28),
            end: new Date(y, m, 29),
            className: ['openSesame']
          });
        };

        /* remove event */
        $scope.remove = function(index) {
          $scope.events.splice(index,1);
        };
		
        /* Change View */
        $scope.changeView = function(view,calendar) {
          uiCalendarConfig.calendars[calendar].fullCalendar('changeView',view);
        };

        /* Change View */
        $scope.renderCalender = function(calendar) {
          if(uiCalendarConfig.calendars[calendar]){
            uiCalendarConfig.calendars[calendar].fullCalendar('render');
          }
        };
         /* Render Tooltip */
        this.eventRender = function( event, element, view ) {
            element.attr({'tooltip': event.title,
                         'tooltip-append-to-body': true});
            //$compile(element)($scope);
        };

        /* Add Events Upon Backgroud select */
        this.alertOnSelect = function(start, end, jsEvent, view) {

            // Open ui.bootstrap.modal
            //$modal.scope.data = {};
            var modalInstance = $modal.open({
              templateUrl: CalendarPartials + 'addeventmodal.html',
              controller: function ($scope, $modalInstance) {
                $scope.data = {};
                $scope.add = function () {
                    $modalInstance.close($scope.data);
                };
                $scope.cancel = function () {
                    $modalInstance.dismiss('cancel');
                };
              }
            });

            modalInstance.result.then(function (data) {
              alert( "Modal succeeded - closed: Event-Name: " + data.title );
              console.log("data: " + data);
            }, function () {
              alert("Modal dismissed at: " + new Date());
            });

        };

        /* config object */
        $scope.uiConfig = {
          calendar:{
            height: 450,
            editable: true,
            header:{
              left: 'prev,next today',
              center: 'title',
              right: 'month,agendaWeek,agendaDay'
            },
            selectable: true,
            select: this.alertOnSelect,
            eventClick: this.alertOnEventClick,
            eventDrop: this.alertOnDrop,
            eventResize: this.alertOnResize,
            eventRender: this.eventRender
          }
        };


        // -----------------------------------------------------------------
        // Use Events-Resource to get my Calendar

        /* event source that pulls from google.com */
        //"http://www.google.com/calendar/feeds/en.german%23holiday%40group.v.calendar.google.com/public/basic"
        $scope.eventSource=
        {
            url: "/static/scripts/scheduler/feeds/publicholidays.html",
            className: 'germany',
            color: 'red'
        };

        /* event source that calls a function on every view switch */
        this.GetEvents = function (start, end, timezone, callback) {
            if (uiCalendarConfig.calendars !== undefined) {
                var calendars = Object.keys(uiCalendarConfig.calendars);
                for (i=0; i< calendars.length; i++) {
                    CalendarEventService.MyCalendarEvents({'calendarId':calendars[i]}, function(data) {
                        console.log('received-data: ' + JSON.stringify(data));
                        AppendEvents(data);
                      });
                }
            }
        };

        // Global Function to Append Events - and Avoid duplicate events
        function AppendEvents(data) {
            for(i=0; i<data.length; i++) {
                var FlagFound = false;
                for(j=0; j< $scope.events.length; j++) {
                    // check that pk(id) exists
                    if($scope.events[j].pk == data[i].pk) {
                        // Update Existing Event
                        $scope.events[j]  = data[i];
                        FlagFound = true;
                        break;
                    }
                }
                if(!FlagFound) {
                    $scope.events.push(data[i]);
                }
            }
        };

        $scope.events = [
          {title: 'All Day Event',start: new Date(y, m, 1)},
          {title: 'Long Event',start: new Date(y, m, d - 5),end: new Date(y, m, d - 2)},
          {id: 999,title: 'Repeating Event',start: new Date(y, m, d - 3, 16, 0),allDay: false},
          {id: 999,title: 'Repeating Event',start: new Date(y, m, d + 4, 16, 0),allDay: false},
          {title: 'Birthday Party',start: new Date(y, m, d + 1, 19, 0),end: new Date(y, m, d + 1, 22, 30),allDay: false},
          {title: 'Click for Google',start: new Date(y, m, 28),end: new Date(y, m, 29),url: 'http://google.com/'}
        ];

        /* event source that calls a function on every view switch */
        $scope.eventsF = function (start, end, timezone, callback) {
          var s = new Date(start).getTime() / 1000;
          var e = new Date(end).getTime() / 1000;
          var m = new Date(start).getMonth();
          var events = [{title: 'Feed Me ' + m,start: s + (50000),end: s + (100000),allDay: false, className: ['customFeed']}];
          callback(events);
        };

        $scope.calEventsExt = {
           color: '#f00',
           textColor: 'yellow',
           events: [
              {type:'party',title: 'Lunch',start: new Date(y, m, d, 12, 0),end: new Date(y, m, d, 14, 0),allDay: false},
              {type:'party',title: 'Lunch 2',start: new Date(y, m, d, 12, 0),end: new Date(y, m, d, 14, 0),allDay: false},
              {type:'party',title: 'Click for Google',start: new Date(y, m, 28),end: new Date(y, m, 29),url: 'http://google.com/'}
            ]
        };

        /* event sources array*/
        $scope.eventSources = [$scope.events, $scope.eventSource, this.GetEvents];
        //$scope.eventSources2 = [$scope.calEventsExt, $scope.eventsF, $scope.events];
        //this.GetEvents();
    }
    /* EOF */
    return CalendarController;
});