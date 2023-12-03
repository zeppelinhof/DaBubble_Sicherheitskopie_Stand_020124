/*Uhrzeit last response kann aus letztem json in thread jeweils gezogen werden- keine extra variable*/
/*amount responses in thread können auch gezählt werden - keine extra variable*/

let channels = [
  {
    name: 'Entwicklerteams',
    userIds: 111, 222, 333, 444, 555, 666, 777, 888,
    allTopics: [
      {
        userId: 111,
        day: '14.01.2023',
        Uhrzeit: '14:25',
        message: 'Welche Version ist aktuell....',
        emogis: [
          {
            idEmogi: 1,
            amountEmogi: 2,
          },
          {
            idEmogi: 3,
            amountEmogi: 2,
          },
        ],
        amountLikes: 3,
        lastRespons: '14:56',
        thread: [
          {
            userID: 222,
            Uhrzeit: '14:30',
            Tag: '14.01.2023',
            message: 'Ich habe die gleiche Frage...',
            emogis: [
              {
                idEmogi: 1,
                amountEmogi: 2,
              },
              {
                idEmogi: 3,
                amountEmogi: 2,
              },
            ],
            amountLikes: 3,
          },
          {
            userID: 333,
            Uhrzeit: '15:06',
            Tag: '14.01.2023',
            message: 'Ja das ist es',
            emogis: [
              {
                idEmogi: 1,
                amountEmogi: 2,
              },
              {
                idEmogi: 3,
                amountEmogi: 2,
              },
            ],
            amountLikes: 0,
          },
        ],
      },
      {
        userId: 444,
        day: '15.01.2023',
        Uhrzeit: '10:30',
        message: 'Neues Thema im Entwicklerteam...',
        emogis: [
          {
            idEmogi: 2,
            amountEmogi: 1,
          },
          {
            idEmogi: 4,
            amountEmogi: 3,
          },
        ],
        amountLikes: 2,
        lastRespons: '11:15',
        thread: [
          {
            userID: 555,
            Uhrzeit: '11:00',
            Tag: '15.01.2023',
            message: 'Ich stimme zu...',
            emogis: [
              {
                idEmogi: 4,
                amountEmogi: 2,
              },
            ],
            amountLikes: 1,
          },
        ],
      },
      {
        userId: 666,
        day: '16.01.2023',
        Uhrzeit: '09:45',
        message: 'Diskussion über neue Funktionen...',
        emogis: [
          {
            idEmogi: 1,
            amountEmogi: 1,
          },
          {
            idEmogi: 3,
            amountEmogi: 2,
          },
        ],
        amountLikes: 5,
        lastRespons: '10:20',
        thread: [
          {
            userID: 777,
            Uhrzeit: '10:00',
            Tag: '16.01.2023',
            message: 'Ich schlage vor, XYZ hinzuzufügen...',
            emogis: [
              {
                idEmogi: 2,
                amountEmogi: 2,
              },
            ],
            amountLikes: 3,
          },
          {
            userID: 888,
            Uhrzeit: '11:30',
            Tag: '16.01.2023',
            message: 'Gute Idee! Ich bin dafür...',
            emogis: [
              {
                idEmogi: 1,
                amountEmogi: 1,
              },
            ],
            amountLikes: 2,
          },
        ],
      },
    ],
  },
  {
    name: 'HR Channel',
    userIds: 111, 222, 333, 888, 999
    allTopics: [
      {
        userId: 111,
        day: '14.01.2023',
        Uhrzeit: '14:25',
        message: 'Der Arbeitsvertrag muss noch erstellt werden',
        emogis: [
          {
            idEmogi: 1,
            amountEmogi: 2,
          },
          {
            idEmogis: 3,
            amountEmogi: 2,
          },
        ],
        amountLikes: 3,
        lastRespons: '14:56',
        thread: [
          {
            userID: 222,
            Uhrzeit: '14:30',
            Tag: '14.01.2023',
            message: 'Kann das jemand übernehmen?',
            emogis: [
              {
                idEmogi: 1,
                amountEmogi: 2,
              },
              {
                idEmogi: 3,
                amountEmogi: 2,
              },
            ],
            amountLikes: 3,
          },
          {
            userID: 333,
            Uhrzeit: '15:06',
            Tag: '14.01.2023',
            message: 'Kann ich machen',
            emogis: [
              {
                idEmogi: 1,
                amountEmogi: 2,
              },
              {
                idEmogis: 3,
                amountEmogi: 2,
              },
            ],
            amountLikes: 0,
          },
        ],
      },
      {
        userId: 888,
        day: '16.01.2023',
        Uhrzeit: '13:30',
        message: 'Besprechung über neue Mitarbeiter...',
        emogis: [
          {
            idEmogi: 2,
            amountEmogi: 1,
          },
        ],
        amountLikes: 1,
        lastRespons: '14:00',
        thread: [
          {
            userID: 999,
            Uhrzeit: '13:45',
            Tag: '16.01.2023',
            message: 'Ich schlage vor, XYZ einzustellen...',
            emogis: [
              {
                idEmogi: 4,
                amountEmogi: 2,
              },
            ],
            amountLikes: 2,
          },
        ],
      },
    ],
  },
];
