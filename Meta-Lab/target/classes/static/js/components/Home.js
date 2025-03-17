const Home = {
    template: `
        <div class="home-container">
            <section class="content-section beige">
                <div class="section-content reverse">
                    <div class="image-block">
                        <img src="images/ab1.jpg" alt="Modern Laboratory">
                    </div>
                    <div class="text-block">
                        <h2>Modern Laboratory Diagnostics</h2>
                        <p>MetaLaboratory is an innovative medical center equipped with advanced technology for all types of laboratory tests. We offer a wide range of analyses and diagnostic procedures with maximum accuracy of results.</p>
                        <router-link to="/about" class="primary-button">Learn More</router-link>
                    </div>
                </div>
            </section>

            <section class="content-section white">
                <div class="section-content">
                    <div class="image-block">
                        <img src="images/ab2.jpg" alt="Laboratory Tests">
                    </div>
                    <div class="text-block">
                        <h2>Wide Range of Tests</h2>
                        <p>In our laboratory, you can undergo more than 1000 different types of tests: from basic blood analysis to complex genetic testing. We use modern techniques and expert-class equipment to ensure maximum accuracy of results.</p>
                        <router-link to="/catalog" class="primary-button">View Catalog</router-link>
                    </div>
                </div>
            </section>

            <section class="content-section advantages">
                <div class="advantages-container">
                    <h2>Why Choose Us?</h2>
                    <div class="advantages-list">
                        <div class="advantage-item">
                            <div class="advantage-circle">
                                <i class="fas fa-clock"></i>
                            </div>
                            <h3>Fast Results</h3>
                            <p>Results available from 2 hours to 1 day</p>
                        </div>
                        <div class="advantage-item">
                            <div class="advantage-circle">
                                <i class="fas fa-medal"></i>
                            </div>
                            <h3>Accuracy</h3>
                            <p>Modern expert-class equipment</p>
                        </div>
                        <div class="advantage-item">
                            <div class="advantage-circle">
                                <i class="fas fa-wallet"></i>
                            </div>
                            <h3>Affordable Prices</h3>
                            <p>Flexible discount system and promotions</p>
                        </div>
                        <div class="advantage-item">
                            <div class="advantage-circle">
                                <i class="fas fa-user-md"></i>
                            </div>
                            <h3>Experienced Specialists</h3>
                            <p>Highly qualified medical professionals</p>
                        </div>
                    </div>
                </div>
            </section>

            <section class="content-section light-pink">
                <div class="section-content reverse">
                    <div class="image-block">
                        <img src="images/ab3.jpg" alt="Team of Specialists">
                    </div>
                    <div class="text-block">
                        <h2>Expert Team of Specialists</h2>
                        <p>Our doctors and laboratory technicians are top-class professionals with many years of experience. We continuously improve our qualifications and implement the latest research methods to ensure maximum accuracy of results.</p>
                    </div>
                </div>
            </section>

            <section class="content-section white">
                <div class="section-content">
                    <div class="image-block">
                        <img src="images/ab4.jpg" alt="Comfortable Conditions">
                    </div>
                    <div class="text-block">
                        <h2>Comfort and Safety</h2>
                        <p>We have created the most comfortable conditions for our patients. Modern equipment, cozy premises, and attentive staff will make your visit pleasant and safe. Test results are available in your personal account immediately after completion.</p>
                    </div>
                </div>
            </section>
        </div>
    `
};
