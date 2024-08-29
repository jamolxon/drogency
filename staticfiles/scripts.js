(function (window, undefined) {
    'use strict';


// Get the modal
    var modal = document.getElementById("deleteModal");

// Get the <span> element that closes the modal
    var span = document.getElementsByClassName("close-x")[0];

    var no = document.getElementsByClassName("No")[0];


// confirm deletion
    const deleteButtons = document.querySelectorAll(".removeButton");
    for (let i = 0; i < deleteButtons.length; i++) {
        deleteButtons[i].addEventListener("click", function (evt) {
            evt.preventDefault();
            const id = deleteButtons[i].dataset.id;
            const href = deleteButtons[i].href
            showDeletePopup(id , href);
        });
    }

    /**
     * @param id is id of tour that you wanna delete
     */


    function showDeletePopup(id , href) {
        function removeCharacter(str_to_remove, str) {
            let reg = new RegExp(str_to_remove);
            return str.replace(reg, '')
        }

        let url = document.URL
        url = url.split('?')[0]
        url = url.replace('list/', '')
        let deleteURL = url + "delete/";
        deleteURL = removeCharacter("#", deleteURL);

        const deletePopupWindow = document.querySelector("#deleteModal");
        const modalDeleteLink = document.querySelector("#modalDeleteButton");

        if (href){
           deletePopupWindow.style.display = "block";
            modalDeleteLink.setAttribute("href", href);
        }else{
            deletePopupWindow.style.display = "block";
            modalDeleteLink.setAttribute("href", deleteURL + id + "/");
        }
    }


// When the user clicks on <span> (x), close the modal
    span.onclick = function () {
        modal.style.display = "none";
    };

    no.onclick = function () {
        modal.style.display = "none";
    };
// When the user clicks anywhere outside of the modal, close it
    window.onclick = function (event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    };


// confirm cancelation


// Get the button that opens the modal
    var btn = document.getElementById("cancelBtn");


// When the user clicks the button, open the modal

    btn.onclick = function () {
        modal.style.display = "block";
    };

// When the user clicks on <span> (x), close the modal
    span.onclick = function () {
        modal.style.display = "none";
    };

    no.onclick = function () {
        modal.style.display = "none";
    };
// When the user clicks anywhere outside of the modal, close it
    window.onclick = function (event) {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    };


})(window);
