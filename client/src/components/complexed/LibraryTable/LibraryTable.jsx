import React from 'react'
import classes from './LibraryTable.module.scss'


function LibraryTable({ data, changeHandler }) {
  return (
    <table className={classes.LibraryTable}>
      <thead className={classes.LibraryTable_header}>
        <tr className={classes.LibraryTable_header}>
          <th>Логотип и название</th>
          <th>Раундов</th>
          <th>Сложность</th>
        </tr>
      </thead>
      <tbody>
        {
          data.map((item, index) => {
            return <tr key={index}>
              <th>
                <div className={classes.test}>
                  <div className={classes.lobbyAvatar}>
                    <img src={item.logo} alt={''} />
                  </div>
                  <span>{item.name}</span>
                </div>
              </th>
              <th>{item.numberOfRounds}</th>
              <th>{item.difficulty}</th>
              <th><button onClick={changeHandler} name={`Pack__${index}__${item.numberOfRounds}__${item.difficulty}__${item.logo}__${item.name}`}>Выбрать</button></th>
            </tr>
          })
        }
      </tbody>
    </table>
  )
}

export default LibraryTable
