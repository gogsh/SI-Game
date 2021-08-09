import React from 'react'
import classes from './About.module.scss'
import Link from '../Links/Link/Link'
import { NavLink } from 'react-router-dom'

function About(props) {
  return (
    <div className={classes.About}>
      <div className={classes.About_container}>
        <div className={classes.About_container_header}>
          <NavLink to={'/main'} className={classes.About_container_header_link}>
            {'<< Назад'}
          </NavLink>
        </div>

        <div className={classes.About_container_body}>
          <h1>
            {props.name}
          </h1>
          <span className={classes.About_container_body_discription}>Рекомендации:</span>
          <span className={classes.About_container_body_text}>Ответом и вопросом может быть что угодно: картинка, видео, музыка. Правила ссылок на них будет указано ниже.</span>
          <span className={classes.About_container_body_text}>После конвертации пака из оригинальной SiGame проверте корректность вопросов и ответов. Некоторые изображения могут попасть в вопрос, являясь при этом ответом на него.</span>
          <span className={classes.About_container_body_text}>Как ссылаться на контент в вопросе:</span>
          <ul>
            <li>Картинка: просто укажите ссылку на неё, скопировав URL</li>
            <li>Видео: в разработке</li>
            <li>Музыка: в разработке</li>
          </ul>          
        </div>
        </div>



        {props.children}
      </div>
      )
}

      export default About

