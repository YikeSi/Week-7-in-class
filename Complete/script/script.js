var margin = {t:50,r:125,b:50,l:125};
var width = $('.plot').width() - margin.r - margin.l,
    height = $('.plot').height() - margin.t - margin.b;

var canvas = d3.select('.plot')
    .append('svg')
    .attr('width',width+margin.r+margin.l)
    .attr('height',height + margin.t + margin.b)
    .append('g')
    .attr('class','canvas')
    .attr('transform','translate('+margin.l+','+margin.t+')');

//Scale for the size of the circles
var scaleR = d3.scale.sqrt().domain([5,100]).range([5,120]);


d3.csv('data/olympic_medal_count.csv', parse, dataLoaded);

function dataLoaded(err,rows){

    var year = 1900;
    rows.sort(function(a,b){
        //Note: this is called a "comparator" function
        //which makes sure that the array is sorted from highest to lowest
        return b[year] - a[year];
    });

    //Note: this returns positions 0,1,2,3,4 of the "rows" array
    var top5 = rows.slice(0,5);
    draw(top5, year);

    //TODO: fill out this function
    $('.btn-group .year').on('click',function(e){
        e.preventDefault();

        var year = $(this).data('year');
        console.log(year);
    });
}

function draw(rows, year){
    var topTeams = canvas.selectAll('.team')
        .data(rows, function(d){ return d.country; })
        .enter()
        .append('g')
        .attr('class', 'team')
        .attr('transform',function(d,i){
            //i ranges from 0 to 4
            return 'translate(' + i*(width/4) + ',' + height/2 + ')';
        });
    topTeams
        .append('circle')
        .attr('r', function(d){
            return scaleR(d[year]);
        })
    topTeams
        .append('text')
        .attr('class','team-name')
        .text(function(d){ return d.country; })
        .attr('y', function(d){ return scaleR(d[year]+20)})
        .attr('text-anchor','middle');
    topTeams
        .append('text')
        .attr('class','medal-count')
        .text(function(d){ return d[year];})
        .attr('text-anchor','middle');
}

function parse(row){
    //@param row is each unparsed row from the dataset
    return {
        country: row['Country'],
        1900: +row['1900'],
        1960: +row['1960'],
        2012: +row['2012']
    };
}