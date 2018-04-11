window.onload = function(){
    page.init();
    popUp.init();
    
};

/* page -------------------------------------- */
var page = {
    x_sm: 768,
    x: null,
    y: null
};

page.init = function(){

    page.dimensioning();
    page.events();

    $(window).resize(function(){
        page.dimensioning();
        page.events();
    });
};

page.dimensioning = function(){
    this.x = window.innerWidth;
    this.y = window.innerHeight;
};

page.events = function(){

    if(this.x_sm <= this.x){
        
    }else{

        
    } 
};



/* informer ---------------------------------- */
var informer = {
    active: 'active',
    bl: '.informer',
    tim: 800,
    int: 4000    
};

informer.init = function() {
    this.events();
};

informer.events = function() {
    
    var setTim = setTimeout(function() {
        
        informer.open();
        clearTimeout(setTim);
        
    }, 1000); 
};

informer.open = function() {
    $(this.bl).addClass(informer.active);
    
    if(page.x_sm <= page.x){
         
        $(this.bl).animate({opacity: '1', bottom: 130}, informer.tim);
    }else{
         
        $(this.bl).animate({opacity: '1', bottom: 90}, informer.tim);
    }
    
    var setTim = setTimeout(function() {
        
        informer.close();
        clearTimeout(setTim);
        
    }, this.int);
};

informer.close = function() {
     
    $(this.bl).animate({opacity: '0', bottom: 0}, this.tim, function(){
        $(informer.bl).removeClass(informer.active);
    });
};



/* goods ------------------------------------- */
/*var goods = {
    active: 'active',
    menu: '.rounded-menu',
    bl: '.goods',
    box: '.goods__box'
};

goods.init = function() {
    this.events();
};

goods.events = function() {
    
    $('body').on('click', this.menu + ' li', function(event){
        var ind = $(this).index();
        $(this).parents(goods.menu).find('li').removeClass(goods.active);
        $(this).addClass(goods.active);
        $(this).parents(goods.bl).find(goods.box).removeClass(goods.active);
        $(this).parents(goods.bl).find(goods.box).eq(ind).addClass(goods.active);
    });   
};*/



/* popUp ------------------------------------- */
var popUp = {
    active: 'active',
    error: 'error',
    blur: 'blur',
    popUp: 'openPopUp',
    
    inactive_butt: 'button--inactive',
    id_add_name: 'popUp_username',
    
    input: '.inputPopup',
    input_name: '.input-name',
    input_email: '.input-email',
    
    button_open: '.price-box .button',
    button_switching: '.popUp-switching__button',
    
    button_addInput: 'inputAdd',
    button_closeInput: 'inputClose',
    
    button_submit: '.popUp-butt .button',
    button_close: '.popUp-close', 
    
    window: '.popUp',
    window_bl: '.popUp__block',
    window_box: '.popUp__window',
    window_price: '.popUp--price',
     
    block: '.popUp-block',
    
    switching: '.popUp-switching',
    cont_box: '.popUp-cont__box',
    cont_box_created: '.popUp-cont__box--created',
 
    limit_box: 10,
    tim: 150, 
    
    mask_name: /^[а-яa-z0-9]{3,}/i,
    mask_email: /^[а-яa-z0-9]+([\.-]?[а-яa-z]+)*@[а-яa-z]+([\.-]?[а-яa-z]+)*(\.[а-яa-z]{2,6})+$/i
};

popUp.init = function() {
    this.events();
};

popUp.events = function() {
    
    $('body').on('click', function(event){
        if($(event.target).closest(popUp.window_box + ', ' + popUp.button_open + ', ' + popUp.cont_box).length){
            return;
        }
        popUp.closeWindow();
    });
 
    $('body').on('click', this.button_close, function(event){
        popUp.closeWindow();
    }); 
     
    $('body').on('click', '.' + this.button_addInput, function(event){
        popUp.addBox($(this));
    }); 
    
    $('body').on('click', '.' + this.button_closeInput, function(event){
        $(this).parent().remove();
    }); 
     
    $('body').on('click', this.button_switching, function(event){
        $(this).parents(popUp.switching).find(popUp.button_switching).removeClass(popUp.active);
        $(this).addClass(popUp.active);
    });  
    
    $('body').on('click', this.button_submit, function(event){
        popUp.validation_test();
    });  
    
    $('body').on('focusin', this.input, function(event){
        if($(this).parents(popUp.cont_box).hasClass(popUp.error)){
            $(this).parents(popUp.cont_box).removeClass(popUp.error);
        }
    }); 
};

popUp.openWindow = function(th) {
    $(th).fadeIn(popUp.tim);
    $(th).addClass(popUp.active);
    $('body').addClass(popUp.blur);
    $('body').addClass(popUp.popUp);
};

popUp.closeWindow = function() {
    $(this.window + '.' + this.active).fadeOut(popUp.tim, function(){
        $('body').removeClass(popUp.popUp);
        $(popUp.window).removeClass(popUp.active);
        popUp.cleaning();
    });
    $('body').removeClass(popUp.blur);
};

popUp.addBox = function(th) {
    if(this.limitBox(th)){
        return;
    }
    var box = popUp.templateBox();
    $(this.block).prepend(box);
};

popUp.limitBox = function(th) {
    var siz = th.parents(this.window).find(this.input_name).length;
    if(siz >= this.limit_box) {
        return true;
    }else {
        return false;
    }
};

popUp.templateBox = function() {
    return '<div class="popUp-cont__box popUp-cont__box--created">' + 
           '<input class="inputPopup input-name" type="text" name="link[]" placeholder="Link to your photo or video" />' + 
           '<div class="inputClose"></div>' +
           '</div>';
};

popUp.cleaning = function() {
    var win = this.window + '.' + this.active;
    
    $(this.cont_box_created).remove();
    $(this.input).val('');
    
    $(this.cont_box).removeClass(popUp.error);

    $(this.button_switching).removeClass(this.active);
    $(this.button_switching).eq(0).addClass(this.active);
    
    for(var i=0; i<$(this.switching).length; i++) {
        $(this.switching).eq(i).find(this.button_switching).removeClass(this.active);
        $(this.switching).eq(i).find(this.button_switching).eq(0).addClass(this.active);
    }
};

popUp.validation_test = function() {
    var win = this.window + '.' + this.active;
    var inpName = $(this.window + '.' + this.active + ' ' + this.input_name);
    var inpEmail = $(this.window + '.' + this.active + ' ' + this.input_email);
        
    for(var i=0; i<inpName.length; i++) {
        if(popUp.mask_name.test(inpName.eq(i).val())) {
            inpName.eq(i).parents(popUp.cont_box).removeClass(popUp.error);
        }else{
            inpName.eq(i).parents(popUp.cont_box).addClass(popUp.error);
        }
    }
    
    if(popUp.mask_email.test(inpEmail.val())) {
        inpEmail.parents(popUp.cont_box).removeClass(popUp.error);
    }else{
        inpEmail.parents(popUp.cont_box).addClass(popUp.error);
    }

    if(!$(win + ' ' + this.cont_box + '.' + this.error).length){
        this.validation_success();
    } 
};

popUp.validation_success = function() {
    console.log('validation success');
};

function load_page(url)
{
    $.get(url, function (data) {
        $(".goods").html($(data).find(".goods").html());
        $(".social-networks").html($(data).find(".social-networks").html());
        $(".button-block").html($(data).find(".button-block").html());
        document.title = $(data).filter("title").text();
        history.pushState(null, null, url)
    });
}

function open_popup(pop_id, kol, kol_text, price, placeholder = '', price2 = 0, price2_active = 0)
{
    popUp.openWindow('#'+pop_id); 
    $('#'+pop_id+' #kol_text').html(kol_text);
    $('#'+pop_id+' #kol').val(kol);
    if (price > 0)
        $('#'+pop_id+' #but_text').val('Pay '+price+'$');
    if (placeholder)
        $('#'+pop_id+' input[name="link"]').attr('placeholder', placeholder);
    if (price2)
    {
        $('#'+pop_id+' #price1').val(price);
        $('#'+pop_id+' #price2').val(price2);
        if (price2_active)
            $('#'+pop_id+' #but_text').val('Pay '+price2+'$');
    }
}

function send_form(form)
{
    $.post("", $(form).serialize(), function(data) {
        res = $.parseJSON(data);
        if (res.result == 'Ok')
        {
            if (res.redirect)
                window.location = res.redirect;
            if (res.close_modal)
                $("#"+res.close_modal).hide();
            if (res.open_modal)
                open_popup(res.open_modal);
        }
        else if (res.result == 'Error')
        {
            alert(res.text);
        }
    })
}

function calc_autolikes_in_form(count)
{
    $('#popUp_3 #kol_text').html(parseInt($('#popUp_3 #kol').val().replace(' ', '') / count) + ' Likes per post');
    if (parseInt($('#popUp_3 #kol').val().replace(' ', '') / count) < 100)
    {
        $("#popUp_3 #count").val(Math.ceil($('#popUp_3 #kol').val().replace(' ', '')/100));
        $('#popUp_3 #kol_text').html(parseInt($('#popUp_3 #kol').val().replace(' ', '') / parseInt($("#popUp_3 #kol").val())) + ' Likes per post');
    }
}

