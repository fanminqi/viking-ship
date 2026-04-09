import React from 'react'
import { config } from 'react-transition-group'
import { render, fireEvent, screen } from '@testing-library/react'

import Alert, { AlertProps } from './alert'
config.disabled = true

jest.mock('../Icon/icon', () => {
  return (props: any) => {
    return <span>{props.icon}</span>
  }
})

const testProps: AlertProps = {
  title: 'title',
  onClose: jest.fn()
}

const typeProps: AlertProps = {
  ...testProps,
  type: 'success',
  description: 'hello',
  closable: false
}
describe('test Alert Component', () => {
  it('should render the correct default Alert', () => {
    render(<Alert {...testProps}/>)
    const title = screen.getByText('title')
    expect(title).toBeInTheDocument()
    expect(title).toHaveClass('viking-alert-title')
    fireEvent.click(screen.getByText('times'))
    expect(testProps.onClose).toHaveBeenCalled()
    expect(screen.queryByText('title')).not.toBeInTheDocument()
  })
  it('should render the correct Alert based on different type and description', () => {
    render(<Alert {...typeProps}/>)
    const title = screen.getByText('title')
    expect(title).toHaveClass('bold-title')
    expect(screen.getByText('hello')).toBeInTheDocument()
    expect(screen.queryByText('times')).not.toBeInTheDocument()
  })
})
