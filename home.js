


if (localStorage.getItem("namee") === null) {
    document.getElementById("username").innerHTML = "Hey, Guest!";
}

else {
    document.getElementById("username").innerHTML = "Hey, "  + localStorage.getItem("namee") + "!";
}





////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////
//
// POP UPS & WINDOWS
//
///////////////////////////////////////////////////////////////////////////

function openFullscreenMenu() {
    document.getElementById("fullscreen-menu").style.visibility = 'visible';
    document.getElementById("fullscreen-menu").style.pointerEvents = 'all';
    document.getElementById("fullscreen-menu").style.display = 'flex'; 
}

function hideFullscreenMenu () {
    document.getElementById("fullscreen-menu").style.visibility = 'hidden';
    document.getElementById("fullscreen-menu").style.pointerEvents = 'none';
    document.getElementById("fullscreen-menu").style.display = 'none';
}
 
function SettingsWindow() {
    document.getElementById("settingsWindow").style.opacity = '1';
    document.getElementById("settingsWindow").style.pointerEvents = 'all';
}

function closeSettings() {
    document.getElementById("settingsWindow").style.opacity = "0";
    document.getElementById("settingsWindow").style.pointerEvents = 'none';
}


function Username() {
    document.getElementById("usernamePromt").style.opacity = '1';
    document.getElementById("usernamePromt").style.pointerEvents = 'all';
}

function sendUsername() {
    let Usernamee = document.getElementById("usernameValue").value;

    if (Usernamee.length === 0) {
         document.getElementById("inputError").style.visibility = "visible";
         document.getElementById("inputError").style.display = "block";
    }

    else {
        document.getElementById("username").innerHTML = "Hey, " + Usernamee + "!";
        localStorage.setItem('namee', Usernamee);
        document.getElementById("usernamePromt").style.opacity = '0';
        document.getElementById("usernamePromt").style.pointerEvents = 'none';
        document.getElementById("inputError").style.visibility = "hidden";
        document.getElementById("inputError").style.display = "none";
    }
    
}

function closePopup() {
    document.getElementById("usernamePromt").style.opacity = '0';
    document.getElementById("usernamePromt").style.pointerEvents = 'none';
    document.getElementById("inputError").style.visibility = "hidden";
    document.getElementById("inputError").style.display = "none";
}




$( function() {
    // $( "#left_section, #right_section" ).sortable();
    // $( "#left_section" ).disableSelection();
    $( ".draggable" ).draggable( {
       handle:'.modal-header', 
       containment: 'window',
      } );
  } );


////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////
//
// RIGHT CLICK FUNCTION
//
///////////////////////////////////////////////////////////////////////////

if (document.addEventListener) {
  document.addEventListener('contextmenu', function(e) {
    var rightClickDiv = document.getElementById('right-click-general');
    rightClickDiv.style.display = "block";
    
    var divWidth = rightClickDiv.offsetWidth;
    var divHeight = rightClickDiv.offsetHeight;
    var windowWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    var windowHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
    
    var left = e.clientX + "px";
    var top = e.clientY + "px";

    // Check if the div would go beyond the right side of the window
    if (e.clientX + divWidth > windowWidth) {
      left = (e.clientX - divWidth) + "px";
    }

    // Check if the div would go beyond the bottom side of the window
    if (e.clientY + divHeight > windowHeight) {
      top = (e.clientY - divHeight) + "px";
    }
    
    rightClickDiv.style.left = left;
    rightClickDiv.style.top = top;
    e.preventDefault();
  }, false);

  document.addEventListener('click', function(e) {
    var rightClickDiv = document.getElementById('right-click-general');
    var targetElement = e.target;

    // Check if the target element or any of its ancestors is the right-click div
    var isClickedInside = rightClickDiv.contains(targetElement);
    if (!isClickedInside || targetElement.tagName === 'LI') {
      rightClickDiv.style.display = "none";
    }
  });

  var liElements = document.querySelectorAll('#right-click-menu > li');
  liElements.forEach(function(li) {
    li.addEventListener('click', function() {
      document.getElementById('right-click-general').style.display = "none";
    });
  });
}



////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////
//
// 
//
///////////////////////////////////////////////////////////////////////////


function drag(event) {
  event.dataTransfer.setData("text", event.target.id);
  event.dataTransfer.effectAllowed = 'move';
}

function allowDrop(event) {
  event.preventDefault();
  event.dataTransfer.dropEffect = "move";
}


function drop(event) {
  event.preventDefault();
  var data = event.dataTransfer.getData("text");
  var element = document.getElementById(data);
  if (element instanceof Node) {
    event.target.appendChild(element);
  }
}



// Get the resizable div element
const resizableDiv = document.getElementById('left_section');

// Retrieve the stored size from local storage, if available
const storedSize = localStorage.getItem('resizableSize');

// Set the stored size or default size
if (storedSize) {
  const size = JSON.parse(storedSize);
  resizableDiv.style.width = size.width;
  resizableDiv.style.height = size.height;
} else {
  resizableDiv.style.width = '300px';
  resizableDiv.style.height = '200px';
}

// Save the size when the resizing stops
let resizeTimer;
resizableDiv.addEventListener('mouseup', function() {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(saveSize, 500);
});

// Function to save the size in local storage
function saveSize() {
  const size = {
    width: resizableDiv.style.width,
    height: resizableDiv.style.height
  };
  localStorage.setItem('resizableSize', JSON.stringify(size));

}


////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////
//
//  FETCHING SHORTCUTS from JSON
//
///////////////////////////////////////////////////////////////////////////

// Fetch the shortcut data from shortcut.json
fetch('shortcuts.json')
  .then(response => response.json())
  .then(data => {
    const shortcutContainer = document.getElementById('left_section');

    // Loop through the shortcut data and create HTML elements
    for (let index = 0; index < data.length; index++) {
      const shortcut = data[index];

      // Create the outer shortcut div
      const shortcutDiv = document.createElement('div');
      shortcutDiv.setAttribute('data-id', index + 1); // Set the data-id attribute
      shortcutDiv.className = 'item shortcut';
      shortcutDiv.addEventListener('dragstart', drag);
      shortcutDiv.addEventListener('dragover', allowDrop);
      shortcutDiv.addEventListener('drop', drop);

      // Create the icon div and its contents
      const iconDiv = document.createElement('div');
      iconDiv.className = 'icon';
      const iconLink = document.createElement('a');
      iconLink.href = shortcut.url;
      iconLink.target = '_blank';
      const iconImg = document.createElement('img');
      iconImg.src = shortcut.icon;
      iconImg.draggable = false;
      iconLink.appendChild(iconImg);
      iconDiv.appendChild(iconLink);

      // Create the title div and its contents
      const titleDiv = document.createElement('div');
      titleDiv.className = 'title';
      const titleLink = document.createElement('a');
      titleLink.href = shortcut.url;
      titleLink.target = '_blank';
      const titlePara = document.createElement('p');
      titlePara.className = 'p_title';
      titlePara.textContent = shortcut.title;
      titleLink.appendChild(titlePara);
      titleDiv.appendChild(titleLink);

      // Append the icon and title divs to the shortcut div
      shortcutDiv.appendChild(iconDiv);
      shortcutDiv.appendChild(titleDiv);

      // Append the shortcut div to the container
      shortcutContainer.appendChild(shortcutDiv);
    }
    initGrid();
})

  .catch( error => {
      console.error(`Error fetching shortcuts: ${error}`);
  })

  
////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////
//
//  MUURI DRAG AND DROP
//
///////////////////////////////////////////////////////////////////////////


  function initGrid() {
    var grid = new Muuri('.grid', {
      dragEnabled: true,
      layoutOnInit: true,
      fillGaps: true,
    }).on('move', function () {
      saveLayout(grid);
      grid.refreshItems();
    });

    [].slice.call(document.querySelectorAll('.item')).forEach(function (elem) {
      let isDragging = false;

      elem.addEventListener('dragstart', function () {
        isDragging = true;
      });

      elem.addEventListener('dragend', function () {
        isDragging = false;
      });

      elem.addEventListener('click', function (e) {
        if (isDragging) {
          e.preventDefault();
        }
      });
    });

    var layout = window.localStorage.getItem('layout');
    if (layout) {
      loadLayout(grid, layout);
    } else {
      grid.layout(true);
    }
  }

  function serializeLayout(grid) {
    var itemIds = grid.getItems().map(function (item) {
      return item.getElement().getAttribute('data-id');
    });
    return JSON.stringify(itemIds);
  }

  function saveLayout(grid) {
    var layout = serializeLayout(grid);
    window.localStorage.setItem('layout', layout);
  }

  function loadLayout(grid, serializedLayout) {
    var layout = JSON.parse(serializedLayout);
    var currentItems = grid.getItems();
    var currentItemIds = currentItems.map(function (item) {
      return item.getElement().getAttribute('data-id')
    });
    var newItems = [];
    var itemId;
    var itemIndex;

    for (var i = 0; i < layout.length; i++) {
      itemId = layout[i];
      itemIndex = currentItemIds.indexOf(itemId);
      if (itemIndex > -1) {
        newItems.push(currentItems[itemIndex])
      }
    }

    grid.sort(newItems, {layout: 'instant'});

  }
  
  function ReloadPage() {
    location.reload();
    grid.sort(newItems, {layout: 'instant'});
  }