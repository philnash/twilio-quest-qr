extern crate wasm_bindgen;
extern crate qrcode;

use wasm_bindgen::prelude::*;

use qrcode::render::svg;
use qrcode::QrCode;

#[wasm_bindgen]
pub fn qrcode(arg: &str, width: u32, height: u32, dark_color: &str, light_color: &str) -> String {
    let result = QrCode::with_error_correction_level(arg, qrcode::EcLevel::Q)
        .map(|code| code.render::<svg::Color>()
            .max_dimensions(width, height)
            .min_dimensions(width, height)
            .dark_color(svg::Color(dark_color))
            .light_color(svg::Color(light_color))
            .build()
        );

    match result {
        Ok(v) => v,
        Err(e) => format!("{}", e),
    }
}
