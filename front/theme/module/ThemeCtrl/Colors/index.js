import './index.less'
import Section from '../../../../builder/plugin/component/Section'
import ColorPicker from '../../../../builder/plugin/component/ColorPicker'

class ColorCtrl extends React.PureComponent {
  handleChangeComplete (color, target1, target2){
    const { pageConfig } = this.props
    pageConfig.theme.colors.data[target1][target2].value = color
    window.myreflux.trigger('configChange', pageConfig, true)
  }
  render() {
    const { config } = this.props
    const { data } = config
    const colorsList = Object.entries(data)

    if (!colorsList || colorsList.length === 0) {
      return (<span>Unset</span>)
    }

    return (
      <React.Fragment>
        {
          colorsList.map(([title, colors]) => {
            if (colors) {
              return (
                <Section
                  key={title}
                  title={title}
                  style={{ paddingTop: 10, paddingBottom: 10 }}
                >
                  <div className='theme-ctrl-color-item'>
                    {
                      Object.entries(colors).map(([colorName, item]) => (
                        <ColorPicker
                          key={colorName}
                          label={colorName}
                          color={item.value}
                          onChangeComplete={({ hex }) => {
                            this.handleChangeComplete(hex, title, colorName)
                          }}
                        />
                      ))
                    }
                  </div>
                </Section>
              )
            }
          })
        }
      </React.Fragment>
    )
  }
}
export default ColorCtrl