const dssel= document.querySelector('.ds');
const dpsel= document.querySelector('.dp');
const rmsel= document.querySelector('.rm');
const subbtn= document.querySelector('.subbtn');
const board= document.querySelector('.board');
subbtn.addEventListener('click', size);
const musharray=[
    `images/0.png`,
    `images/1.png`,
    `images/2.png`,
    `images/3.png`,
    `images/4.png`,
    `images/5.png`,
    `images/6.png`,
    `images/7.png`,
    `images/8.png`,
    `images/9.png`
];
let array= [];
let newarray= [];
let pair;
let require;
let checkarray= [];
let checknth= 0;
let brvariable= 0;

function size(){
    pair= dpsel.value;
    require= rmsel.value;
    let br= pair*require;

    if(br == 4 || br == 6 || br ==  8 || br ==  10){
        brvariable= br/2;
    }else if(br == 9 || br ==  12 || br ==  15){
        brvariable= br/3;
    }else if(br == 16 || br ==  20){
        brvariable= br/4;
    }else if(br == 25){
        brvariable= br/5;
    }else{
        brvariable= 0;
    };

    board.innerHTML= '';
    newarray= [];
    board.addEventListener('click',change);
    print();
};

function print(){
    for(p= 0; p<pair; p++){
        for(r= 0; r<require; r++){
            array.push(p);
        };
    };

    for(x= 0; x<(pair*require); x++){
        let randomize= (Math.floor((Math.random() * array.length)));
        newarray.push(JSON.parse(array.splice(randomize, 1)));
    };

    if(dssel.value== 'penguin'){    
        for(pen= 0; pen<newarray.length; pen++){
            newarray[pen]= newarray[pen] + 5;
        };
    };

    let brcounter= 0;

    for(y= 0; y<newarray.length; y++){
        board.innerHTML+= `<img class='` + newarray[y] + ` notclicked' src='images/blank.png'>`;
        brcounter++;
        
        if(brcounter== brvariable){
            board.innerHTML+='<br>';
            brcounter= 0;
        };
    };
    console.log(newarray);
    
};

function change(e){
    if(e.target.classList.contains('notclicked')){
        e.target.src= musharray[e.target.classList[0]];
        e.target.classList.remove('notclicked');
        checkarray.push(e.target.classList[0]);
        if(checkarray.length == require){
            check();
        };
    };
};

function check(){
    if(checknth < (require-1)){
        if(checkarray[checknth] != checkarray[checknth+1]){
            checknth= (require-1);
            reset();
        };
        checknth++;
        check();
    }else if(checknth== (require-1)){
        checkarray= [];
        checknth= 0;
    };
};

function reset(){
    let btn= document.createElement('button');
    btn.innerHTML= 'Incorrect';
    btn.onclick= function(){
        for(z= 0; z<checkarray.length; z++){
            for(zz= 0; zz<checkarray.length; zz++){
                if(document.getElementsByClassName(checkarray[z]).item(zz).classList.length != 2){
                    document.getElementsByClassName(checkarray[z]).item(zz).classList.add('notclicked');
                };
                document.getElementsByClassName(checkarray[z]).item(zz).src= `images/blank.png`;
            };
        };
        
        checkarray= [];
        checknth= 0;
        document.body.removeChild(btn);
        board.addEventListener('click',change);
    };

    document.body.appendChild(btn);
    board.removeEventListener('click', change);
};