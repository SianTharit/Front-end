const bookingData = [
   {
      id: 1,
      roomId: "A101",
      startTime: "2019-09-28 13:00:00",
      endTime: "2019-09-28 14:00:00",
      title: "Lunch with Petr",
   },
   {
      id: 2,
      roomId: "A101",
      startTime: "2019-09-28 14:00:00",
      endTime: "2019-09-28 15:00:00",
      title: "Sales Weekly Meeting",
   },
   {
      id: 3,
      roomId: "A101",
      startTime: "2019-09-28 16:00:00",
      endTime: "2019-09-28 18:00:00",
      title: "Anastasia Website Warroom",
   },
   {
      id: 4,
      roomId: "A101",
      startTime: "2019-09-29 13:00:00",
      endTime: "2019-09-29 14:00:00",
      title: "One-on-One Session",
   },
   {
      id: 5,
      roomId: "A101",
      startTime: "2019-09-29 16:00:00",
      endTime: "2019-09-29 18:00:00",
      title: "UGC Sprint Planning",
   },
   {
      id: 6,
      roomId: "A102",
      startTime: "2019-09-30 09:00:00",
      endTime: "2019-10-04 18:00:00",
      title: "5-Day Design Sprint Workshop",
   },
   {
      id: 7,
      roomId: "Auditorium",
      startTime: "2019-09-19 09:00:00",
      endTime: "2019-09-23 19:00:00",
      title: "Thai Tech Innovation 2019",
   },
   {
      id: 8,
      roomId: "A101",
      startTime: "2019-09-28 10:00:00",
      endTime: "2019-09-28 13:00:00",
      title: "Raimonland project",
   },
   {
      id: 9,
      roomId: "A102",
      startTime: "2019-09-30 18:00:00",
      endTime: "2019-09-30 20:00:00",
      title: "Management Meetinng",
   },
   {
      id: 10,
      roomId: "A101",
      startTime: "2019-10-04 14:00:00",
      endTime: "2019-10-06 11:00:00",
      title: "3-day workshop Corgi costume",
   },
   //    {
   //       id: 11,
   //       roomId: "A101",
   //       startTime: "2022-07-16 11:00:00",
   //       endTime: "2019-10-06 11:00:00",
   //       title: "3-day workshop Corgi costume",
   //    },
];

const AllNewDateTime = (el) => {
   return new Date(el).getTime();
};

const getWeekNumOfMonthOfDate = (d) => {
   const firstDay = new Date(d.getFullYear(), d.getMonth(), 1).getDay();
   //    console.log(firstDay, "firstDay");
   return Math.ceil((d.getDate() + firstDay) / 7);
};

// console.log(new Date("2019-09-20 14:00:00").getDate());
// const weekNumOfDate = getWeekNumOfMonthOfDate(new Date(2022, 1, 20));
// console.log(weekNumOfDate);

const checkAvailability = (roomId, startTime, endTime) => {
   if (roomId) {
      const getData = bookingData.filter((el) => el.roomId === roomId);
      //   console.log(getData);
      if (getData) {
         const Booking = getData.filter((el) => {
            // console.log(AllNewDateTime(el.startTime));
            // console.log(AllNewDateTime(el.endTime));
            return (
               (AllNewDateTime(el.startTime) >= AllNewDateTime(startTime) &&
                  AllNewDateTime(endTime) >= AllNewDateTime(el.startTime)) ||
               (AllNewDateTime(el.endTime) >= AllNewDateTime(endTime) &&
                  AllNewDateTime(el.endTime) <= AllNewDateTime(startTime))
            );
         });
         if (Booking.length > 0) {
            return `The room is available ${startTime} to ${endTime}`;
         } else if (Booking.length <= 0) {
            return `The room is not available at ${startTime} to ${endTime} `;
         }
      }
   }
};

const getBookingsForToday = (roomId) => {
   if (roomId) {
      const getData = bookingData.filter((el) => el.roomId === roomId);
      if (getData) {
         const DateWeek = getData.filter((el) => {
            // console.log(getWeekNumOfMonthOfDate(new Date(el.startTime)));
            // console.log(new Date(el.startTime));

            return (
               new Date(el.startTime).toLocaleDateString("en-US") ===
               new Date().toLocaleDateString("en-US")
            );
         });
         //  console.log(new Date().toLocaleDateString("en-US"));
         //  console.log(new Date(), "Date");
         return DateWeek;
      }
   }
};

const getBookingsForWeek = (roomId, weekNo) => {
   if (roomId) {
      const getData = bookingData.filter((el) => el.roomId === roomId);
      if (getData) {
         const DateWeek = getData.filter((el) => {
            // console.log(getWeekNumOfMonthOfDate(new Date(el.startTime)));
            return getWeekNumOfMonthOfDate(new Date(el.startTime)) === weekNo;
         });
         return DateWeek;
      }
   }
};

const getBookingsForNextWeek = (roomId, weekNo) => {
   if (roomId) {
      const getData = bookingData.filter((el) => el.roomId === roomId);
      if (getData) {
         const DateWeek = getData.filter((el) => {
            return (
               getWeekNumOfMonthOfDate(new Date(el.startTime)) === weekNo + 1
            );
         });
         return DateWeek;
      }
   }
};

console.log(
   checkAvailability("A102", "2019-09-30 09:00:00", "2019-10-06 11:00:00")
);

// console.log(getBookingsForToday("A101"));

// console.log(getBookingsForWeek("A102", 5));

// console.log(getBookingsForNextWeek("A101", 3));
