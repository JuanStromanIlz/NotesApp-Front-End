import { forwardRef } from 'react';
import { format, parseISO } from 'date-fns';
import { es } from "date-fns/locale";
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Form } from './Form';
import { Button } from './Button';

const formSchema = Yup.object().shape({
  title: Yup.string()
    .min(1, 'Muy corto!')
    .max(60, 'Muy largo!')
    .required('Campo obligatorio'),
  sub: Yup.string()
    .min(1, 'Muy corto!')
    .max(60, 'Muy largo!'),
  content: Yup.string()
    .min(1, 'Muy corto!')
    .max(300, 'Muy largo!')
    .required('Campo obligatorio'),
  category: Yup.string()
    .min(1, 'Muy corto!')
    .max(25, 'Muy largo!')
    .required('Campo obligatorio'),
});

export const ValidationForm = forwardRef(({note, className, sendForm}, ref) => {
  const formik = useFormik({
    initialValues: 
      note ? 
      { 
        _id: note._id,
        writer: note.writer,
        title: note.title,
        sub: note.sub,
        content: note.content,
        category: note.category,
        updatedAt: format(parseISO(note.updatedAt), "eeee',' d LLL yyyy", {locale: es})
      } :
      {
        title: '',
        sub: '',
        content: '',
        category: ''
      }
    ,
    validationSchema: formSchema,
    onSubmit: (values, { resetForm }) => {
      sendForm(values);
      resetForm();
    }
  });

  return (
    <Form ref={ref} className={className} onSubmit={formik.handleSubmit}>
      {formik.values.updatedAt && <span>Ultima edicion {formik.values.updatedAt}</span>}
      <div className='form-field'>
        <input 
          id='title'
          type='text' 
          name='title' 
          placeholder='Title'
          autoComplete='off'
          value={formik.values.title}
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
        />
        {formik.touched.title && formik.errors.title ? <label className='error-message'>{formik.errors.title}</label> : null}
      </div>
      <div className='form-field'>
        <input 
          type='text' 
          name='sub' 
          placeholder='Subtitle'
          autoComplete='off'
          value={formik.values.sub}
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
        />
        {formik.touched.sub && formik.errors.sub ? <label className='error-message'>{formik.errors.sub}</label> : null}
      </div>
      <div className='form-field'>
        <textarea
          rows='5'
          name='content' 
          placeholder='Content'
          autoComplete='off'
          value={formik.values.content}
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
        />
        {formik.touched.content && formik.errors.content ? <label className='error-message'>{formik.errors.content}</label> : null}
      </div>
      <div className='form-field'>
        <input 
          type='text' 
          name='category' 
          placeholder='Category'
          autoComplete='off'
          value={formik.values.category}
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
        />
        {formik.touched.category && formik.errors.category ? <label className='error-message'>{formik.errors.category}</label> : null}
      </div>
      <Button withText type="submit">Guardar</Button>
    </Form>
  );
});