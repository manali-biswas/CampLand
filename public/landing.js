var slides=document.querySelectorAll('.pics');
var cur=0;
var sinterval=setInterval(nextSlide,4000);

function nextSlide()
{
	slides[cur].className='pics';
	cur=(cur+1)%slides.length;
	slides[cur].className='pics showing';
};