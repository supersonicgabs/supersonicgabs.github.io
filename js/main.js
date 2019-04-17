'use strict';

(function () {
  'use strict';

  var allTargets = document.querySelectorAll('[data-target]');
  var links = Array.prototype.slice.call(allTargets);

  links.forEach(function (link) {
    var linkTarget = link.getAttribute('data-target');
    var allTabs = document.querySelectorAll('[data-tab]');

    link.addEventListener('click', function () {
      var targets = Array.prototype.slice.call(allTabs);
      link.classList.remove('active');
      targets.forEach(function (target) {
        target.setAttribute('hidden', '');

        if (linkTarget === target.getAttribute('data-tab')) {
          target.removeAttribute('hidden');
          link.classList.add('active');
        }
      });
    });
  });
})();
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1haW4uanMiXSwibmFtZXMiOlsiYWxsVGFyZ2V0cyIsImRvY3VtZW50IiwicXVlcnlTZWxlY3RvckFsbCIsImxpbmtzIiwiQXJyYXkiLCJwcm90b3R5cGUiLCJzbGljZSIsImNhbGwiLCJmb3JFYWNoIiwibGluayIsImxpbmtUYXJnZXQiLCJnZXRBdHRyaWJ1dGUiLCJhbGxUYWJzIiwiYWRkRXZlbnRMaXN0ZW5lciIsInRhcmdldHMiLCJjbGFzc0xpc3QiLCJyZW1vdmUiLCJ0YXJnZXQiLCJzZXRBdHRyaWJ1dGUiLCJyZW1vdmVBdHRyaWJ1dGUiLCJhZGQiXSwibWFwcGluZ3MiOiI7O0FBQUMsYUFBWTtBQUNiOztBQUVBLE1BQU1BLGFBQWFDLFNBQVNDLGdCQUFULENBQTBCLGVBQTFCLENBQW5CO0FBQ0UsTUFBTUMsUUFBUUMsTUFBTUMsU0FBTixDQUFnQkMsS0FBaEIsQ0FBc0JDLElBQXRCLENBQTJCUCxVQUEzQixDQUFkOztBQUVBRyxRQUFNSyxPQUFOLENBQWMsVUFBVUMsSUFBVixFQUFlO0FBQzNCLFFBQU1DLGFBQWFELEtBQUtFLFlBQUwsQ0FBa0IsYUFBbEIsQ0FBbkI7QUFDQSxRQUFNQyxVQUFVWCxTQUFTQyxnQkFBVCxDQUEwQixZQUExQixDQUFoQjs7QUFFQU8sU0FBS0ksZ0JBQUwsQ0FBc0IsT0FBdEIsRUFBK0IsWUFBVTtBQUN2QyxVQUFNQyxVQUFVVixNQUFNQyxTQUFOLENBQWdCQyxLQUFoQixDQUFzQkMsSUFBdEIsQ0FBMkJLLE9BQTNCLENBQWhCO0FBQ0FILFdBQUtNLFNBQUwsQ0FBZUMsTUFBZixDQUFzQixRQUF0QjtBQUNBRixjQUFRTixPQUFSLENBQWdCLFVBQVVTLE1BQVYsRUFBaUI7QUFDL0JBLGVBQU9DLFlBQVAsQ0FBb0IsUUFBcEIsRUFBOEIsRUFBOUI7O0FBRUEsWUFBR1IsZUFBZU8sT0FBT04sWUFBUCxDQUFvQixVQUFwQixDQUFsQixFQUFrRDtBQUNoRE0saUJBQU9FLGVBQVAsQ0FBdUIsUUFBdkI7QUFDQVYsZUFBS00sU0FBTCxDQUFlSyxHQUFmLENBQW1CLFFBQW5CO0FBQ0Q7QUFDRixPQVBEO0FBUUQsS0FYRDtBQVlELEdBaEJEO0FBa0JELENBeEJBLEdBQUQiLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiAoKSB7XG4ndXNlIHN0cmljdCc7XG5cbmNvbnN0IGFsbFRhcmdldHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdbZGF0YS10YXJnZXRdJyk7XHJcbiAgY29uc3QgbGlua3MgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhbGxUYXJnZXRzKTtcclxuXHJcbiAgbGlua3MuZm9yRWFjaChmdW5jdGlvbiAobGluayl7XHJcbiAgICBjb25zdCBsaW5rVGFyZ2V0ID0gbGluay5nZXRBdHRyaWJ1dGUoJ2RhdGEtdGFyZ2V0Jyk7XHJcbiAgICBjb25zdCBhbGxUYWJzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnW2RhdGEtdGFiXScpO1xyXG5cclxuICAgIGxpbmsuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbigpe1xyXG4gICAgICBjb25zdCB0YXJnZXRzID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYWxsVGFicyk7XHJcbiAgICAgIGxpbmsuY2xhc3NMaXN0LnJlbW92ZSgnYWN0aXZlJyk7XHJcbiAgICAgIHRhcmdldHMuZm9yRWFjaChmdW5jdGlvbiAodGFyZ2V0KXtcclxuICAgICAgICB0YXJnZXQuc2V0QXR0cmlidXRlKCdoaWRkZW4nLCAnJyk7XHJcblxyXG4gICAgICAgIGlmKGxpbmtUYXJnZXQgPT09IHRhcmdldC5nZXRBdHRyaWJ1dGUoJ2RhdGEtdGFiJykpe1xyXG4gICAgICAgICAgdGFyZ2V0LnJlbW92ZUF0dHJpYnV0ZSgnaGlkZGVuJyk7XHJcbiAgICAgICAgICBsaW5rLmNsYXNzTGlzdC5hZGQoJ2FjdGl2ZScpO1xyXG4gICAgICAgIH1cclxuICAgICAgfSk7XHJcbiAgICB9KTsgICAgXHJcbiAgfSk7XG5cbn0oKSk7XG4iXX0=
