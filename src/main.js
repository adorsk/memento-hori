let SKULL = '💀'
let CLOCK = '⏲'
let toLocaleString = 'toLocaleString'
let CLOCKS_PER_PAGE = 60
let innerHTML = 'innerHTML'
let M = Math
let A = Object.assign
let _parseFloat = parseFloat
let playing = 'PP'
let start_time = 'ST'
let padding = 'padding'
let display = 'display'
let flexDirection = 'flexDirection'
let flexGrow = 'flexGrow'
let minHeight = 'minHeight'
let color = 'color'
let background = 'background'
let fontSize = 'fontSize'
let opacity = 'opacity'
let D = document
let B = D.body
let div = 'div'
let flexies = {
  [display]: 'flex',
  [flexDirection]: 'column',
  [flexGrow]: 1,
  [minHeight]: 0,
}

function main() {
  let state = {
    m: 1e4,
  }
  create_ui({ state })
}

function create_ui({ state }) {
  let ui = {}
  A(
    B.style,
    flexies,
    {
      height: '100vh',
    }
  )
  ui.c = create_element(div, B, {}, {
    ...flexies,
    width: '100%',
    textAlign: 'center',
    [fontSize]: '20px',
    [padding]: '20px',
  })
  create_element(div, ui.c, { [innerHTML]: 'How many more years will you live?' })
  ui.yi = create_element(
    'input',
    ui.c,
    { value: 20 },
  )
  create_element(div, B, ui.y_f)

  ui.b = create_element('button', ui.c, {
    [innerHTML]: `MEMENTO HORI ${SKULL} ➤`,
    onclick() {
      state[start_time] = Date.now()
      let years = _parseFloat(ui.yi.value)
      if (!years || years <= 0) {
        alert("Invalid number")
        return
      }
      let end_time = state[start_time] + (years * 365 * 24 * 60 * 60 * 1e3)
      state.m = ~~((end_time - state[start_time]) / (60 * 1e3))
      ui.s.max = state.m
      ui.s.value = 1
      state.c = 0

      A(ui.c.style, {
        [background]: '#333',
        [color]: '#DDD',
      })
      render({ ui, state })
    },
  }, {
    [background]: '#111',
    [color]: '#DDD',
  }
  )
  ui.m_c = create_element(div, ui.c, {}, {
    ...flexies,
    [opacity]: 0,
    [padding]: '20px',
  })
  ui.m_label = create_element(div, ui.m_c)
  ui.p_b = create_element('button', ui.m_c, {
    [innerHTML]: 'play/pause life',
    onclick() {
      state[playing] = !state[playing]
      if (state[playing]) {
        let frame_fn
        frame_fn = () => {
          if (state[playing]) {
            state.c += 1
            if (state.c > state.m) {
              state[playing] = false
              return
            }
            ui.s.value = state.c
            render({ ui, state })
            requestAnimationFrame(frame_fn)
          }
        }
        frame_fn()
      }
    },
  })
  ui.s_c = create_element(div, ui.m_c, {}, { [display]: 'flex', })
  ui.s = create_element(
    'input',
    ui.s_c,
    {
      type: 'range',
      min: 1,
      max: 1,
      value: 1,
      step: 1,
      oninput(e) {
        state.c = _parseFloat(e.target.value)
        render({ ui, state })
      },
    },
    {
      [flexGrow]: 1,
      minWidth: 0,
    }
  )
  create_element(div, ui.s_c, {
    [innerHTML]: SKULL,
  }, { [padding]: '0.5em' })

  ui.k = create_element(
    div,
    ui.m_c,
    {},
    {
      ...flexies,
      [flexDirection]: 'row',
      flexWrap: 'wrap',
      width: '100%',
      fontSize: '40px',
      overflow: 'scroll',
    },
  )
  return ui
}

function create_element(tag, parent, attrs, styles) {
  let el = D.createElement(tag)
  parent.appendChild(el)
  attrs && A(el, attrs)
  styles && A(el.style, styles)
  return el
}

function render({ ui, state }) {
  let m = state.m
  let clocks = ui.k
  ui.m_c.style[opacity] = 1
  let start = state.c
  let end = M.min(start + CLOCKS_PER_PAGE - 1, m)
  ui.m_label[innerHTML] = `${start[toLocaleString]()} - ${end[toLocaleString]()} of ~${m[toLocaleString]()} minutes of life remaining.`
  clocks[innerHTML] = ''
  for (let i = start; i <= end; i++) {

    let emoji = (i === m) ? SKULL : CLOCK
    let _color = `hsl(${`${(2 ** 31 - 1 & M.imul(48271, i)) / 2 ** 31}`.slice(-10) % 360}, 90%, 90%)`
    create_element(
      div,
      clocks,
      {
        [innerHTML]: `<div><i>${i}</i><div style="font-size: 40px; transform: rotate(${i % 360}deg);">${emoji}</div><div>${new Date(state[start_time] + (i * 60 * 1e3))[toLocaleString]('sv')}</div></div>`
      },
      {
        [color]: _color,
        border: `1px solid ${_color}`,
        [padding]: '10px',
        [fontSize]: 'x-small',
      },
    )
  }
}

main()
