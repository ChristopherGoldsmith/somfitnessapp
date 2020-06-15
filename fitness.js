
    let workoutModule = {
        init: function(){
            this.cacheDom();
            this.bindEvents();
          //  this.render();
        },
        cacheDom: function(){
            this.container = document.getElementById('container');
            this.workout = document.getElementById('workouts');
            this.days = document.getElementById('days');
            this.chest = document.getElementById('chest');
            this.shoulders = document.getElementById('shoulders');
            this.back = document.getElementById('back');
            this.legs = document.getElementById('legs');
            this.chosen = [];
        },
        bindEvents:function(){
            this.chest.addEventListener('click', this.clicked.bind(this, chest));
            this.shoulders.addEventListener('click', this.clicked.bind(this, shoulders));
            this.back.addEventListener('click', this.clicked.bind(this, back));
            this.legs.addEventListener('click', this.clicked.bind(this, legs));
        },
        //render:,
        workouts: {
            chest: {
                pri: ['Push Ups', 'Dumbell Press', 'Bench Press'],
                acc: ['Dumbbell Flys', 'Incline Pushups', 'Incline Press']
            },
            shoulder: {
                pri: ['Shoulder Press'],
                acc: ['Front Raises', 'Reverse Flys', 'Lateral Raises']
            },
            back: {
                pri: ['Barbbell Rows'],
                acc: ['Dumbbell Rows', 'Shrugs', 'Closegrip Rows']
            },
            legs: {
                pri:['Squats', 'Weighted Squats'],
                acc:['Lunges', 'Romanian Deadlifts']
            },
            extra: {
                core: ['Crunches', 'Leg Raises', 'Bycicle Kicks'],
                cardio: ['Running', 'Biking']
            }
        },
        clicked: function(i){
            if(i.className != 'clicked' && this.chosen.length < 2){
                workoutModule.createLine(i);
                i.className='clicked';
                this.chosen.push(i);
            } else if(i.className == 'clicked' && this.chosen.length <= 2){
                i.className = 'textbox';
                j = this.chosen.indexOf(i);
                this.chosen.splice(j, 1);
            } else if(i.className != 'clicked' && this.chosen.length == 2){
            /*blank*/}
        },
        workoutGen: function(){
            this.day = day,
            this.pri = pri,
            this.pri2 = pri2,
            this.acc = acc,
            this.acc2 = acc2,
            this.extra = extra 
        },
        createLine: function(w){
            t = w.innerText;
            a = document.getElementById('workouts');
            wrk = document.createElement('li');
            wrk.className = 'workouts2';
            txt = document.createTextNode(t);
            a.appendChild(wrk);
            wrk.appendChild(txt);
        },
        createWorkout: function(){
              
        } 
    };
workoutModule.init()
console.log(workoutModule)

// create workout = primary / secondary / runs both in system then generates a 5-7
// exercise workout.