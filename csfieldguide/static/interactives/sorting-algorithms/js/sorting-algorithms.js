// globals
var comparisons = 0;
var last_left_image;
var last_right_image;

window.onload = function() {
    var images_to_sort = document.getElementsByClassName('to-sort');
    for (var i = 0; i < images_to_sort.length; i++) {
        var image = images_to_sort[i];
        // generate random weight between 1 and 100 (inclusive)
        image.dataset.weight = Math.floor(Math.random() * Math.floor(100)) + 1;
    }
    var url_string = window.location.href;
    var url = new URL(url_string);
    var method = url.searchParams.get("method");
    if (method != 'quick') {
        document.getElementById('sorting-algorithms-interactive-item-unsorted-row-2').style.display = 'none';
    }
}

$(function() {
    var image_list = [];
    var alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('');
    for (var i = 0; i < alphabet.length; i++) {
        image_list.push(document.getElementById('box-' + alphabet[i]));
    }
    var drake = dragula(image_list);
    drake.on('drop', (target, source) => {
        if (source.children.length == 2) { // means an element has been dropped in this div 
            swap(target, source);
        }
        compareWeights();
    });
});

function swap(target, source) {
    // get id of moved image
    var moved_img_id = target.id;
    
    // get the div that the moved image came from
    var target_div_id = moved_img_id.slice(0, 5);
    var target = document.getElementById(target_div_id);
    
    // figure out which image needs to be moved
    var img_to_move;
    if (source.children[0].id != moved_img_id) {
        img_to_move = source.children[0];
    } else if (source.children[1].id != moved_img_id) {
        img_to_move = source.children[1];
    }

    target.appendChild(img_to_move);

    var tmp_id = target.id;
    target.id = source.id;
    source.id = tmp_id;
}

function compareWeights() {
    var left_weight_div = document.getElementsByClassName('left-weight-content')[0];
    var right_weight_div = document.getElementsByClassName('right-weight-content')[0];
    var left_weight = left_weight_div.children[0].dataset.weight;
    var right_weight = right_weight_div.children[0].dataset.weight;

    // check if both are placeholder images
    if (left_weight == 0 && right_weight == 0) {
        rotateIndicator('middle');
    } else {
        if (left_weight > right_weight) { // left is heavier
            rotateIndicator('left');
        } else if (right_weight > left_weight) { // right is heavier
            rotateIndicator('right');
        }
        if (left_weight != 0 && right_weight != 0) {
            countComparisons();
        }
    }
}

function rotateIndicator(direction) {
    indicator = document.getElementById('scale');
    if (direction == 'left') {
        indicator.style.webkitTransform = 'rotate(-90deg)'; 
        indicator.style.mozTransform    = 'rotate(-90deg)'; 
        indicator.style.msTransform     = 'rotate(-90deg)'; 
        indicator.style.oTransform      = 'rotate(-90deg)'; 
        indicator.style.transform       = 'rotate(-90deg)';
    } else if (direction == 'middle') {
        indicator.style.webkitTransform = 'rotate(0deg)'; 
        indicator.style.mozTransform    = 'rotate(0deg)'; 
        indicator.style.msTransform     = 'rotate(0deg)'; 
        indicator.style.oTransform      = 'rotate(0deg)'; 
        indicator.style.transform       = 'rotate(0deg)';
    } else { //right
        indicator.style.webkitTransform = 'rotate(90deg)'; 
        indicator.style.mozTransform    = 'rotate(90deg)'; 
        indicator.style.msTransform     = 'rotate(90deg)'; 
        indicator.style.oTransform      = 'rotate(90deg)'; 
        indicator.style.transform       = 'rotate(90deg)';
    }
}


function countComparisons() {
    left_image = document.getElementsByClassName('left-weight-content')[0].children[0];
    right_image = document.getElementsByClassName('right-weight-content')[0].children[0];
    if ((left_image != last_left_image) || (right_image != last_right_image)) {
        comparisons += 1
        document.getElementById('comparison-counter-number').innerText = comparisons;
        last_left_image = left_image;
        last_right_image = right_image;
    }
}

function checkOrder() {
    var ordered_boxes = document.getElementsByClassName('ordered-box-content');
    var sorted = true;
    var weights = []
    for (var i = 0; i < ordered_boxes.length; i++) {
        var weight = ordered_boxes[i].children[0].dataset.weight
        if (weight > 0) {
            weights.push(weight);
        }
    }
    if (weights.length < 8) {
        sorted = false;
    } else {
        var previous_weight = weights[0];
        for (var i = 0; i < weights.length; i++) {
            var weight = weights[i];
            if (parseInt(weight) < parseInt(previous_weight)) {
                sorted = false
            }
            previous_weight = weight;
        }
    }
    if (sorted) {
        document.getElementById('check-order-result-text-correct').style.display = 'block';
        document.getElementById('check-order-result-text-incorrect').style.display = 'none';
    } else {
        document.getElementById('check-order-result-text-correct').style.display = 'none';
        document.getElementById('check-order-result-text-incorrect').style.display = 'block';
    }
}