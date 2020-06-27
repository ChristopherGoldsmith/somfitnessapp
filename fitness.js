    
    let loginMod = {
        init: function(){
            this.popDom()
            this.cacheDom();
            this.bindEvents();
        },
        cacheDom: function(){
            this.container1 = document.getElementById('container')
            this.username = document.getElementById('username');
            this.password = document.getElementById('password');
            this.submit = document.getElementById('submit1');
        },
        parts: ['Chest', 'Back', 'Legs', 'Shoulders'],
        
        bindEvents: function(){
            this.submit.addEventListener('click', this.clkSubmit.bind(this));
        },
        create: function(type, attach, text, css, id){
            let newDiv = document.createElement(type);
            if(type != 'input'){
                txt = document.createTextNode(text);
                newDiv.appendChild(txt);
                newDiv.className = css;
                attach.appendChild(newDiv);
            };
            if(type == 'input'){
                newDiv.placeholder = text;
                box = document.createElement('div')
                box.className = css;
                box.appendChild(newDiv)
                attach.appendChild(box);
            }
            newDiv.id = id;
            return newDiv;
        },  
        popDom: function(){
            x = document.getElementById('container');
            x.innerHTML = '';
            un = this.create('input', x, 'Username', 'userInput', 'username');
            pw = this.create('input', x, 'Password', 'userInput', 'username');
            sub = this.create('div', x , 'Submit', 'submitButton', 'submit1');
        },
        clkSubmit: function(){;
            this.container1.innerHTML = '';
            this.container1.className = 'container';
            this.popWorkoutModule();
            workoutModule.init();
        },
        popWorkoutModule: function(){
            console.log(this.parts);
            y = this.parts.length;
            x.innerHTML = '';
            for(i = 0; y > i; i++){
                this.create('div', this.container1, this.parts[i], 'textbox', this.parts[i]);
            }
            this.create('div', this.container1, 'Sumbit', 'submitButton', 'submit2');
        }
    }
    let workoutModule = {
        init: function(){
            this.cacheDom();
            this.bindEvents();
          //  this.render();
        },
        cacheDom: function(){
            this.container1 = document.getElementById('container');
            this.workout = document.getElementById('workouts');
            this.days = document.getElementById('days');
            this.chest = document.getElementById('Chest');
            this.shoulders = document.getElementById('Shoulders');
            this.back = document.getElementById('Back');
            this.legs = document.getElementById('Legs');
            this.submit = document.getElementById('submit2');
            this.chosen = [];
            this.volume = [];
            this.workout1 = [];
            this.test = document.getElementById('test');
        },
        bindEvents:function(){
            this.chest.addEventListener('click', this.clicked.bind(this, this.chest, this.training.chest));
            this.shoulders.addEventListener('click', this.clicked.bind(this, this.shoulders, this.training.shoulders));
            this.back.addEventListener('click', this.clicked.bind(this, this.back, this.training.back));
            this.legs.addEventListener('click', this.clicked.bind(this, this.legs, this.training.legs));
            this.submit.addEventListener('click', this.submitButton.bind(this, this.training.chosen));
            this.test.addEventListener('click',this.initWorkout.bind());
        },
        ranN: function(num){
            return Math.floor(Math.random() * num);
        },
        //render:,
        training: {
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
        //training gexcersise genertor, use call or apply function to generate it;
        generateTraining: function(){
            this.exercise = arguments[0];
            this.weight = arguments[1];
            this.distance = arguments[2];
            this.time = arguments[3];  //speed for cardio only;
            this.volume = arguments[4]; //
            this.rest = arguments[5]; //rest between sets
            this.record = arguments[6]; // pr for exercise
            this.bodyParts = arguments[7]; //an array containing the part this exercises
        },
        //
        makeInput: function(div){
            loginMod.create('input', div, '', 'input', `input${i}`)
        },
        //!
        clicked: function(i, a){
            if(i.className != 'clicked' && this.chosen.length < 2){
                i.className='clicked';
                this.chosen.push(a);
            } else if(i.className == 'clicked' && this.chosen.length <= 2){
                i.className = 'textbox';
                j = this.chosen.indexOf(a);
                this.chosen.splice(j, 1);
            } else if(i.className != 'clicked' && this.chosen.length == 2){
                //blank
            }
        },
        //!
        trainingSelector: function(cho, vol){
            e = 1
            for(i = 0; i < cho.length; i++){
                num = this.ranN(cho[i].pri.length);
                a = cho[i].pri[num];
                e =+ 1;
                loginMod.create('div', this.container1, `${a}: ${pounds} x ${reps}`, 'textbox', `exersise${e}`);
                for(j = 0; j < vol[i]; j++){
                    num2 = this.ranN(cho[i].acc.length);
                    b = cho[i].acc[num2]
                    e =+1;
                    loginMod.create('div', this.container1, `${b}: ${pounds} x ${reps}`, 'textbox', `exersise${e}`);
                }
            }
        },
// create volume selector
// creates an input that allows you to enter a number 0-9 which determines the number of acc;
        volumeSelector: function(v){
            return this.volume.push(v);
        },
/*create primary and acc excersises for 1+ categories.
have a pri, then a number of acc requested/reccomended both in a variable.
*/

        printWorkout: function(x, y){
                n = this.ranN(x.length)
                loginMod.create('div', this.container1, `${x[n]} for 10 reps`, 'textbox', `exersise${y}`)
        },
        submitButton: function(){
            //t=Object.keys(this.chosen[0])
            //console.log(this.chosen[0].pri[0])
            this.container1.innerHTML = '';
            this.trainingSelector(this.chosen, 2);
        },
        createWorkout: function(){
            workout1.push(this.training.arguments[i].pri[]);
            workout1.push(this.training.arguments[i].acc[]);
        },

        initWorkout: function(){
            if(workoutModule.chosen.length == 2){
                this.test.addEventListener('click', this.createWorkout.bind(this, workoutModule.workout1))
            } else{
                alert('pick more workouts');
            }
        }
    };
loginMod.init();

/* 
-First screen is profile screen asking for login info or to create account.
-Hamburger Menu in top left with workout histoory and profile details.
-Create workout = primary / secondary (can choose 1 twice to create double workout,
or only choose 1 for half workout) with option for strength hypertrophy or hybrid
runs both in system then generates a 5-7 exercise workout.
-Has timer for workouts based on type (str or hyp).
-Exercises are objects with attributes showing muscle groups used to perform excersize,
with a rating on how much they are worked (maybe 1-5) and the primary group of muscles
the excesize is used to workout.
-Success or fail on each exersize.  Buttons for reps and time, this will determine what
your next workout weight needs to be.  
-A focus opetion for focusing onn any perticular muscle.

Main screen - Create workout (has options to save workout, has option to use template
exercises and to creat your own excercises);
-Use saved workout
-Training progress chart.  Chart showing logged workouts, str progress, weight, bodyfat%
cardio progress, other records;  Want trackable things for other things such as mma.

Biggest gains leader board (Only available to those that have logged 10+ workouts, seperated into fitness
level categories and types of workout);

*/