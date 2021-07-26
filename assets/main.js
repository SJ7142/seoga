let count = 0

const slideAni = () => {
  count += 1
  if (count >= 3) {
    count = 0
  }
  $('.mtab > div')
    .eq(count)
    .addClass('active')
    .siblings('.active')
    .removeClass('active')

  $('.caroufredsel_wrapper').css({ marginLeft: '-100' * count + '%' })
}

let timer = setInterval(slideAni, 3500)

const pageIndex = 0
const $sections = $('.fullpage > section')
const lastPageNum = $sections.length
let isAnimated = true

function fullset() {
  $(window).on('mousewheel', function (e) {
    const $currentPage = $('.fullpage > section.active')
    const nextPage = $currentPage.index() + 1
    const prevPage = $currentPage.index() - 1

    let y = 0

    if ($('body').find('.fullpage:animated').length >= 1) return false

    if (e.originalEvent.wheelDelta >= 0) {
      $currentPage
        .prev()
        .addClass('active')
        .siblings('.active')
        .removeClass('active')

      if (prevPage >= 0) {
        $('.contv > a')
          .eq(prevPage)
          .addClass('tvoff')
          .siblings('.tvoff')
          .removeClass('tvoff')

        for (let i = 0; i < prevPage; i++) {
          y += $sections.eq(i).height()
        }

        $('.fullpage').animate({ top: -y + 'px' }, 1000, 'swing')
      }
    } else {
      if (nextPage <= lastPageNum) {
        $('.contv > a')
          .eq(nextPage)
          .addClass('tvoff')
          .siblings('.tvoff')
          .removeClass('tvoff')
        $currentPage
          .next()
          .addClass('active')
          .siblings('.active')
          .removeClass('active')
        for (let i = 0; i < nextPage; i++) {
          y += $sections.eq(i).height()
        }

        $('.fullpage').animate({ top: -y + 'px' }, 1000, 'swing')
      }
    }
  })
}

fullset()

$('.mtab').on('click', 'div', function () {
  count = $(this).index() - 1

  clearInterval(timer)
  slideAni()

  timer = setInterval(slideAni, 3500)

  $(this).addClass('active').siblings('.active').removeClass('active')
})
