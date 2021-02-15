Stock analyzer for Scrooge McDuck.

Apple's historical stock market data analyzer. ReactJS

INFO

Analyzes historical apple stock market data and sorts it the way the user wants. This implementation is probably not what was thought, but I think it is minimum viable product with lightweight table component. It does what is asked (at least I think :D). 



Features implemented: 

-Sorting the table.

-SMA 5 implementation: 5 days simple moving average between closing and opening prices counted in percentage.

-Price change bewteen high and low in the specific day's stock price.

-Counted the upward trend (how many days the stock price was going up in a row).


Added a few styles to make it not look so default.




HOW-TO (Pretty hard to use)

    1. Select dates
    2. Wait 3sec (for making sure the 'fetch' is complete) and enjoy data which you can sort the way want.
    3. Search again if necessary.

BUGS etc.

Solid working thing. Minor bugs with dates: there are times where there is no data between given dates and the application shows data from the last day possible (01.20.2021). Sometimes there might error in reading the data which I have not try/catched.
