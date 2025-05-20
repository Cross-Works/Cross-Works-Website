<template>
    <footer>
        <div class="footer-section">
            <h4>Find us</h4>
            <p>
                1 Bonny Street <br />
                Camden, London, NW1 9PE
            </p>
            <p>View on map</p>
        </div>
        <div class="footer-section">
            <h4>Contact us</h4>
            <p>+44 (0) 20 7916 1827</p>
            <p>Mon-Fri 9 am - 5:30 pm</p>
            <p>london@cross-works.co.uk</p>
        </div>
        <div class="footer-section">
            <h4>Follow us</h4>
            <div class="social-icons">
                <a href="#" class="social-icon">LinkedIn</a>
                <a href="#" class="social-icon">Twitter</a>
                <a href="#" class="social-icon">Instagram</a>
            </div>
        </div>
    </footer>
</template>

<script>
  export default {
      name: "Footer",
  };
</script>

<style lang="scss" scoped>

  @use '../../assets/scss/variables' as *;
  @use '../../assets/scss/templates' as *;


  footer {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: $spacing-xl;
    padding: $spacing-xxl 0;
    border-top: 1px solid var(--theme-border);
    margin-top: auto;

    @extend %template-container;

    
    .footer-section {
      h4 {
        color: var(--theme-accent);
        margin-bottom: $spacing-md;
        font-size: 16px;
      }
      
      p {
        color: var(--theme-text);
        margin-bottom: $spacing-sm;
        font-size: 14px;
      }
      
      .social-icons {
        display: flex;
        gap: $spacing-md;
        
        .social-icon {
          color: var(--theme-link);
          transition: color 0.2s;
          
          &:hover {
            color: var(--theme-link-hover);
          }
        }
      }
    }
  }



  @media (max-width: $breakpoint-lg) {

    
    footer {
      grid-template-columns: 1fr;
      gap: $spacing-xl;
      text-align: center;
      
      .social-icons {
        justify-content: center;
      }
    }
  }


</style>